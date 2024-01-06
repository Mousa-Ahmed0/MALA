import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import accuracy_score, classification_report
import numpy as np
import sys

###########################################
print("---Start of Program---")

# Get Data from .csv file
dataSet = pd.read_csv("CBC data_for_meandeley_csv.csv")

# Create DataFrame 'df'
df = pd.DataFrame(dataSet)

# Create new DF 'X' with needed labels
X = df.iloc[:, 1:12]

####
print("_______________DF X:__________________")
print(X)

#df for issues: Healthe: 0, Anemia: 1
y = df['disease']

###
print("--- Predicted Issue y: ---")
print(y)

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)  # 20% of the data for testing, and 80% for training.

# Initialize the RandomForestClassifier
clf = RandomForestClassifier(random_state=42, n_estimators=20)  # RandomForestClassifier algorithm

# Train the model
clf.fit(X_train, y_train)

# Make predictions on the test set
y_pred = clf.predict(X_test)

###
# Evaluate the model
accuracy = accuracy_score(y_test, y_pred)
classification_rep = classification_report(y_test, y_pred, zero_division=1)

###
print("--- Score: ---")
score = clf.score(X_test, y_test)
print({score})
print("--- Accuracy: ---")
print({accuracy})
print("--- Classification Report:: ---")
print(classification_rep)
print("________________________________________________")

# New data for prediction
new_data = {'Age': [38], 'Sex': [0], 'RBC': [4.47], 'PCV': [30.02], 'MCV': [88.78], 'MCH': [29.65], 'MCHC': [29.45],
            'RDW': [14.54], 'TLC': [8.55], 'PLT /mm3': [225.44], 'HGB': [3.55]}

# Create a DataFrame for the new data
new_df = pd.DataFrame(new_data)
###
newResult = new_df[['Age', 'Sex', 'RBC', 'PCV', 'MCV', 'MCH', 'MCHC', 'RDW', 'TLC', 'PLT /mm3', 'HGB']]

# Make predictions on the new data
pred = clf.predict(newResult)
#
print("--- New Data Prediction: ---")
cond = "Healthy"
if pred == 1:
    cond = "Unhealthy - Anemia"

print(f"new_pred: {pred}, so it's {cond}")
#
