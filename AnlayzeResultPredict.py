import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder, OneHotEncoder
from sklearn.metrics import accuracy_score, classification_report

# E.g dataset
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
label_encoder_patient = LabelEncoder()
label_encoder_doctor = LabelEncoder()
label_encoder_date = LabelEncoder()
label_encoder_C1 = LabelEncoder()
label_encoder_C2 = LabelEncoder()

# convert X Df to be contain numarical categories
X['patient_Ident'] = label_encoder_patient.fit_transform(X['patient_Ident'])
X['doctor_Ident'] = label_encoder_doctor.fit_transform(X['doctor_Ident'])
X['date'] = label_encoder_date.fit_transform(X['date'])
X['C1_resultValue'] = label_encoder_C1.fit_transform(X['C1_resultValue'])
X['C2_resultValue'] = label_encoder_C2.fit_transform(X['C2_resultValue'])

###
print("________________DF X after converted to numercal:_________________")
print(X)

# convert ' predicted_issue ' to numarical
y = label_encoder_patient.fit_transform(df['predicted_issue'])

###
print("--- Predicted Issue y: ---")
print(y)

# Split the data to training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Initialize the RandomForestClassifier
clf = RandomForestClassifier(random_state=42)

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

# create numarical labels
newResult['patient_Ident'] = label_encoder_patient.transform(newResult['patient_Ident'])
newResult['doctor_Ident'] = label_encoder_doctor.transform(newResult['doctor_Ident'])
newResult['date'] = label_encoder_date.transform(newResult['date'])
newResult['C1_resultValue'] = label_encoder_C1.transform(newResult['C1_resultValue'])
newResult['C2_resultValue'] = label_encoder_C2.transform(newResult['C2_resultValue'])


###
print("____________DF newResult after converted to numercal:_________________")
print(newResult)


