import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder, OneHotEncoder
from sklearn.metrics import accuracy_score, classification_report
import numpy as np
###########################################
print("---Start of Program---")

#get Data from .csv file
dataSet = pd.read_csv("D:/fullstck/final project/MALA/Server/utils/python/CBC data_for_meandeley_csv.csv")
print(dataSet.head(3)) #print to sure that the data is true
#

# E.g dataset to test our first model
data = {
    "patient_Ident": ["P1", "P2", "P3", "P4", "P5"],
    "doctor_Ident": ["D1", "D2", "D3", "D4", "D5"],
    "date": ["2023-10-11", "2023-10-11", "2023-10-13", "2023-10-17", "2023-11-11"],
    "component_results": [
        [{"componentName": "C1", "resultValue": "Normal"}, {"componentName": "C2", "resultValue": "High"}],
        [{"componentName": "C1", "resultValue": "High"}, {"componentName": "C2", "resultValue": "Normal"}],
        [{"componentName": "C1", "resultValue": "Normal"}, {"componentName": "C2", "resultValue": "Normal"}],
        [{"componentName": "C1", "resultValue": "High"}, {"componentName": "C2", "resultValue": "High"}],
        [{"componentName": "C1", "resultValue": "Normal"}, {"componentName": "C2", "resultValue": "High"}],
    ],
    "predicted_issue": ["Healthy", "Unhealthy", "Healthy", "Unhealthy", "Unhealthy"],
}

#create DataFrame 'df'
df = pd.DataFrame(data)

# Extract 'component_results' and create columns for 'C1_resultValue' and 'C2_resultValue'
df['C1_resultValue'] = df['component_results'].apply(lambda x: next((item['resultValue'] for item in x if item['componentName'] == 'C1'), None))
df['C2_resultValue'] = df['component_results'].apply(lambda x: next((item['resultValue'] for item in x if item['componentName'] == 'C2'), None))

# Drop 'component_results' column
df.drop('component_results', axis=1, inplace=True)

#  create new DF => X with needed labels
X = df[['patient_Ident', 'doctor_Ident', 'date', 'C1_resultValue', 'C2_resultValue']]

####
print("_______________DF X:__________________")
print(X)

# create numarical labels
label_encoders = {} #save the label encoders in dictinory as ' label_encoder[column] = label_encoder ' to handale new labels in new data
# for on all our df columns
for column in X.columns:
    label_encoder = LabelEncoder()
    X[column] = label_encoder.fit_transform(X[column])
    label_encoders[column] = label_encoder
###
print("________________DF X after converted to numercal:_________________")
print(X)

# convert ' predicted_issue ' to numarical using LabelEncoder
label_encoder_issue = LabelEncoder()
y = label_encoder_issue.fit_transform(df['predicted_issue'])

###
print("--- Predicted Issue y: ---")
print(y)

# Split the data to training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42) # 20% of the data  for testing, and 80%  for training.

# Initialize the RandomForestClassifier
clf = RandomForestClassifier(random_state=42, n_estimators=20) # RandomForestClassifier algorithm

# Train the model
clf.fit(X_train, y_train)

# Make predictions on the test set
y_pred = clf.predict(X_test)

###
print("--- X_test: ---")
print(X_test)
print("--- y_pred Predict: ---")
print( y_pred)

# Evaluate the model
accuracy = accuracy_score(y_test, y_pred)
classification_rep = classification_report(y_test, y_pred, zero_division=1)

###
print("--- Score: ---")
score = clf.score(X_test,y_test)
print({score})
print("--- Accuracy: ---")
print({accuracy})
print("--- Classification Report:: ---")
print(classification_rep)
print("________________________________________________")
# New data for prediction
new_data = {
    "patient_Ident": ["P6"],
    "doctor_Ident": ["D6"],
    "date": ["2023-12-24"],
    "component_results": [
        [{"componentName": "C1", "resultValue": "Normal"}, {"componentName": "C2", "resultValue": "High"}],
    ],
}

# Create a DataFrame for the new data
new_df = pd.DataFrame(new_data)

# 
new_df['C1_resultValue'] = new_df['component_results'].apply(lambda x: next((item['resultValue'] for item in x if item['componentName'] == 'C1'), None))
new_df['C2_resultValue'] = new_df['component_results'].apply(lambda x: next((item['resultValue'] for item in x if item['componentName'] == 'C2'), None))

# 
new_df.drop('component_results', axis=1, inplace=True)

#  
newResult = new_df[['patient_Ident', 'doctor_Ident', 'date', 'C1_resultValue', 'C2_resultValue']]

###
print("--- newResult: ---")
print(newResult)

#

# Check for new categories in each column
for column in newResult.columns: # newResult dataFrame columns
    if column in label_encoders: # cheack if coumn in our label_encoders dictionry
        new_categories = set(newResult[column]) - set(label_encoders[column].classes_) #detrmine if new or not
        if new_categories:
            # Add new categories to the label encoder classes
            label_encoders[column].classes_ = np.concatenate([label_encoders[column].classes_, list(new_categories)])
            # Transform the new data for the current column
            newResult[column] = label_encoders[column].transform(newResult[column])

        #else the category is already exist => transform it
        else: newResult[column] = label_encoder.transform(newResult[column]) 


###
print("____________DF newResult after converted to numercal:_________________")
print(newResult)
# Make predictions on the new data
new_pred = clf.predict(newResult)

print("--- New Data Prediction: ---")
cond = "Healthy"
if new_pred == 1:
    cond = "UnHealthy"

print(f"new_pred: ",new_pred,", so its", cond)


