import requests
import pandas as pd
import json

# Maps pes_id from GSP CSV to Carbon Intensity API region_id
PES_TO_REGION_ID = {
    10: 1,   # North Scotland
    11: 2,   # South Scotland
    12: 3,   # North West England
    13: 4,   # North East England
    14: 5,   # Yorkshire
    15: 6,   # North Wales & Mersey
    16: 7,   # South Wales
    17: 8,   # West Midlands
    18: 9,   # East Midlands
    19: 10,  # East England
    20: 11,  # South West England
    21: 12,  # South England
    22: 13,  # London
    23: 14,  # South East England
}

def fetch_gsp_locations():
    """Fetch GSP node locations from NESO"""
    url = "https://api.neso.energy/dataset/2810092e-d4b2-472f-b955-d8bea01f9ec0/resource/bbe2cc72-a6c6-46e6-8f4e-48b879467368/download/gsp_regions_20181031.csv"
    df = pd.read_csv(url)
    df = df[['gsp_id', 'gsp_name', 'gsp_lat', 'gsp_lon', 'region_id', 'region_name', 'pes_id']].drop_duplicates()
    df.columns = ['gsp_id', 'gsp_name', 'lat', 'lon', 'region_id', 'region_name', 'pes_id']
    return df

def fetch_generation_mix():
    """Fetch live regional generation mix from Carbon Intensity API"""
    url = "https://api.carbonintensity.org.uk/regional"
    response = requests.get(url)
    regions = response.json()['data'][0]['regions']
    
    rows = []
    for region in regions:
        row = {
            'region_id': region['regionid'],
            'region_name': region['shortname'],
            'intensity_index': region['intensity']['index'],
        }
        for fuel in region['generationmix']:
            row[fuel['fuel']] = fuel['perc']
        rows.append(row)
    
    return pd.DataFrame(rows)

def merge_grid_data():
    merged = merged.dropna(subset=['gsp_id'])
    gsps = fetch_gsp_locations()
    generation = fetch_generation_mix()
    gsps['ci_region_id'] = gsps['pes_id'].map(PES_TO_REGION_ID)
    merged = gsps.merge(generation, left_on='ci_region_id', right_on='region_id', how='left')
    return merged

if __name__ == "__main__":
    df = merge_grid_data()
    print(df.head())
    print(f"\nShape: {df.shape}")
    print(f"\nColumns: {df.columns.tolist()}")