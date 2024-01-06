import pandas as pd
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

##########################################
print("---Start of Program---")
# Load the Excel file into a DataFrame
df = pd.read_csv("CBC data_for_meandeley_csv.csv")
print(df)

###
print("---columns 1 to 12---")
records = df.iloc[:, 1:].values
print(records)


######################
#    similarity = cosine_similarity([vec1], [vec2])[0][0]
#    return similarity

###
#θ = cos-1 [ (a · b) / (|a| |b|) ].

# Function to calculate cosine similarity between two vectors
def calc_similarity_vectors(vec1, vec2):
    maxVec1 = np.max(vec1)
    maxVec2 = np.max(vec2)
    vec1_norm = vec1 / maxVec1
    vec2_norm = vec2 / maxVec2
 
    dot_product = np.dot(vec1_norm, vec2_norm) # a.b
    norm_vec1 = np.linalg.norm(vec1_norm) # |a|
    norm_vec2 = np.linalg.norm(vec2_norm) # |b|
    cos_theta  = dot_product / (norm_vec1 * norm_vec2) # (a · b) / (|a| |b|)
    cos_theta = np.clip(cos_theta, -1.0, 1.0) # sure that cos-1 between -1 and 1
    theta = np.arccos(cos_theta) # Get θ in rad
    theta_degrees = np.degrees(theta) # convert to deg
    print(f"Theta is: {theta_degrees}")
    return theta_degrees
############
# Function to convert a new record to vector
def convert_to_vector(new_record):
    return np.array(new_record)

#################
############# [Age, Sex, RBC, PCV, MCV, MCH, MCHC, RDW, TLC, PLT /mm3, HGB] #######
#new_record = [28, 0, 4.27, 35.0, 62.78, 14.65, 15.05, 19.54, 7.55, 117.44, 14.55] 
new_record = [38, 1, 4.07, 44.02, 88.78, 29.65, 33.45, 14.54,8.55, 225.44, 14.55] 
#new_record = [25, 0, 4.13, 42.02, 86.53, 28.42, 30.45, 12.54,9.75, 325.64, 14.82] 
new_record_vector = convert_to_vector(new_record)

###
similarities = [calc_similarity_vectors(new_record_vector, record) for record in records]

###
# Find the index of the min & most similar record in the Excel file
most_similar_index = np.argmin(similarities)
min_similar_index = np.argmax(similarities)

###
# Find the average of similarty in whole Excel file
avg_similarity = sum(similarities) / len(similarities)

# Degree of the most similar record
###
print(f"---The most similar record in the Excel file is at index {most_similar_index} with the lowes angel: {similarities[most_similar_index]} ---")
print(f"---The min similar record in the Excel file is at index {min_similar_index} with the lowes angel: {similarities[min_similar_index]} ---")
print(f"---The avg similarity of new record is angel: {avg_similarity} ---")

