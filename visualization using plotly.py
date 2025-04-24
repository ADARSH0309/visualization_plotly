import streamlit as st
import pandas as pd
import numpy as np
import plotly.express as px
import plotly.graph_objects as go

# Set page configuration for a professional look
st.set_page_config(page_title="EcoTech Analytics Dashboard", layout="wide", page_icon="🌍")

# Sidebar for navigation
st.sidebar.title("EcoTech Analytics")
st.sidebar.markdown("Navigate through the EcoTech data visualizations:")
visualizations = [
    "Sales Funnel",
    "Density Flow (North America)",
    "Customer Satisfaction (2023, North America)",
    "Sales Surface Plot",
    "Interactive Globe",
    "Polar Winds",
    "Eco Batteries (2021)",
    "Sunburst Chart"
]
selected_viz = st.sidebar.radio("Select Visualization", visualizations)

# Header
st.title("EcoTech Analytics Dashboard")
st.markdown("Explore sales, sustainability, and customer satisfaction metrics for EcoTech products across regions and years.")
st.markdown("---")

# Generate sample data
np.random.seed(42)
years = [2020, 2021, 2022, 2023, 2024]
regions = ['North America', 'Europe', 'Asia', 'South America', 'Africa']
products = ['Solar Panels', 'Wind Turbines', 'Eco Batteries', 'Water Purifiers']
df = pd.DataFrame({
    'Year': np.repeat(years, len(regions) * len(products) * 10),
    'Region': np.tile(np.repeat(regions, len(products) * 10), len(years)),
    'Product': np.tile(np.repeat(products, 10), len(years) * len(regions)),
    'Sales': np.random.randint(50, 500, size=len(years) * len(regions) * len(products) * 10),
    'Customer_Satisfaction': np.random.uniform(3.5, 5.0, size=len(years) * len(regions) * len(products) * 10),
    'CO2_Reduction': np.random.uniform(100, 1000, size=len(years) * len(regions) * len(products) * 10),
    'Production_Cost': np.random.uniform(1000, 10000, size=len(years) * len(regions) * len(products) * 10),
    'Latitude': np.tile(np.repeat([40.7, 51.5, 35.6, -23.5, -1.2], len(products) * 10), len(years)),
    'Longitude': np.tile(np.repeat([-74.0, -0.1, 139.7, -46.6, 36.8], len(products) * 10), len(years))
})

# Grouped data for Sales Funnel
groupby_data = df.groupby(['Region', 'Product']).agg({
    'Sales': 'sum',
    'Customer_Satisfaction': 'mean',
    'CO2_Reduction': 'sum',
    'Production_Cost': 'sum'
}).reset_index()
groupby_data['Total_Production'] = groupby_data['Sales'] * 1.2

# Visualization sections
def display_sales_funnel():
    st.subheader("Sales Funnel by Region and Product")
    fig = px.funnel(data_frame=groupby_data, x='Sales', y='Product', color='Region', title='Sales Funnel', template='plotly_dark')
    st.plotly_chart(fig, use_container_width=True)

def display_density_flow():
    st.subheader("Density Flow - North America")
    north_america = df[df['Region'] == 'North America']
    fig = px.density_contour(
        data_frame=north_america, x='Production_Cost', y='CO2_Reduction', marginal_x='histogram', marginal_y='histogram',
        title='EcoTech Density Flow - North America', template='plotly_dark', color_discrete_sequence=['#00FF00']
    )
    fig.update_layout(
        height=600, width=800, xaxis_title='Production Cost ($)', yaxis_title='CO₂ Reduction (tons)',
        margin=dict(l=50, r=50, b=50, t=50)
    )
    st.plotly_chart(fig, use_container_width=True)

def display_customer_satisfaction():
    st.subheader("Customer Satisfaction by Product - North America (2023)")
    df_2023 = df[df['Year'] == 2023]
    north_america = df_2023[df_2023['Region'] == 'North America']
    fig = px.violin(
        data_frame=north_america, x='Customer_Satisfaction', y='Product', box=True, points='all',
        title='Customer Satisfaction by Product - North America'
    )
    fig.update_layout(
        xaxis_title='Customer Satisfaction', yaxis_title='Product', legend_title='Region',
        height=600, width=800, template='plotly_dark'
    )
    st.plotly_chart(fig, use_container_width=True)

def display_sales_surface():
    st.subheader("Sales Surface Plot by Region and Year")
    pvt = df.pivot_table(index='Region', columns='Year', values='Sales', aggfunc='sum')
    fig = go.Figure(data=[go.Surface(z=pvt.values, x=pvt.columns, y=pvt.index)])
    fig.update_layout(
        scene=dict(xaxis_title='Year', yaxis_title='Region', zaxis_title='Sales'),
        template='plotly_dark'
    )
    st.plotly_chart(fig, use_container_width=True)

def display_interactive_globe():
    st.subheader("Interactive Globe of Sales and CO2 Reduction")
    fig = px.scatter_3d(
        df, x='Longitude', y='Latitude', z='Sales', color='CO2_Reduction', size='Customer_Satisfaction',
        animation_frame='Year', color_continuous_scale='Viridis', hover_data=['Product'], title='EcoTech Interactive Globe'
    )
    fig.update_traces(marker=dict(size=5, opacity=0.8), selector=dict(mode='markers'))
    fig.update_layout(scene=dict(aspectmode='cube'), template='plotly_dark')
    st.plotly_chart(fig, use_container_width=True)

def display_polar_winds():
    st.subheader("CO2 Reduction Polar Winds by Year and Product")
    grouped_data = df.groupby(['Year', 'Product'])['CO2_Reduction'].sum().reset_index()
    grouped_data['theta'] = (360 / len(grouped_data['Year'].unique())) * grouped_data['Year'].astype('category').cat.codes
    color_map = {'Solar Panels': 'olive', 'Wind Turbines': 'blue', 'Eco Batteries': 'green', 'Water Purifiers': 'orange'}
    grouped_data['color'] = grouped_data['Product'].map(color_map)
    fig = go.Figure()
    for product in grouped_data['Product'].unique():
        product_data = grouped_data[grouped_data['Product'] == product]
        fig.add_trace(go.Barpolar(
            r=product_data['CO2_Reduction'],
            theta=product_data['theta'],
            marker_color=product_data['color'].iloc[0],
            name=product,
            width=15  # Adjust bar width for clarity
        ))
    fig.update_layout(
        title="Eco Impact Polar Winds",
        barmode='group',
        polar=dict(
            radialaxis=dict(title='CO2 Reduction (tons)', range=[0, grouped_data['CO2_Reduction'].max() * 1.1]),
            angularaxis=dict(
                tickvals=grouped_data['theta'].unique(),
                ticktext=grouped_data['Year'].unique(),
                direction='clockwise'
            )
        ),
        template='plotly_dark',
        height=600,
        width=800,
        margin=dict(l=50, r=50, b=50, t=50)
    )
    st.plotly_chart(fig, use_container_width=True)

def display_eco_batteries():
    st.subheader("Eco Batteries in 2021 - Parallel Coordinates")
    filtered_df = df[(df['Year'] == 2021) & (df['Product'] == 'Eco Batteries')]
    region_color_map = {region: idx for idx, region in enumerate(filtered_df['Region'].unique())}
    filtered_df['Region_Color'] = filtered_df['Region'].map(region_color_map)
    fig = px.parallel_coordinates(
        filtered_df, color='Region_Color',
        dimensions=['Production_Cost', 'Sales', 'Customer_Satisfaction', 'CO2_Reduction'],
        color_continuous_scale=px.colors.sequential.Viridis, title='Eco Batteries in 2021',
        color_continuous_midpoint=0.5
    )
    fig.update_layout(title='Eco Batteries in 2021', height=600, width=800, template='plotly_dark')
    st.plotly_chart(fig, use_container_width=True)

def display_sunburst():
    st.subheader("EcoTech Sunburst Chart")
    fig = px.sunburst(
        df, path=['Year', 'Region', 'Product'], values='Sales', color='Customer_Satisfaction',
        color_continuous_scale='blues', title='EcoTech Sunburst Chart', branchvalues='total'
    )
    fig.update_layout(title='EcoTech Sunburst Chart', height=800, width=800, template='plotly_dark')
    st.plotly_chart(fig, use_container_width=True)

# Display selected visualization
if selected_viz == "Sales Funnel":
    display_sales_funnel()
elif selected_viz == "Density Flow (North America)":
    display_density_flow()
elif selected_viz == "Customer Satisfaction (2023, North America)":
    display_customer_satisfaction()
elif selected_viz == "Sales Surface Plot":
    display_sales_surface()
elif selected_viz == "Interactive Globe":
    display_interactive_globe()
elif selected_viz == "Polar Winds":
    display_polar_winds()
elif selected_viz == "Eco Batteries (2021)":
    display_eco_batteries()
elif selected_viz == "Sunburst Chart":
    display_sunburst()

# Footer
st.markdown("---")
st.markdown("**EcoTech Analytics Dashboard** | Powered by Streamlit and Plotly | Data generated for demonstration purposes.")
