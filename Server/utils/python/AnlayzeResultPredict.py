import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import accuracy_score, classification_report
import numpy as np
import sys
#test
###########################################

# Get Data from .csv file
dataSet = pd.read_csv("../CBC data_for_meandeley_csv.csv")

# Create DataFrame 'df'
df = pd.DataFrame(dataSet)

# Create new DF 'X' with needed labels
X = df.iloc[:, 1:12]

####

#df for issues: Healthe: 0, Anemia: 1
y = df['disease']

###

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
score = clf.score(X_test, y_test)
# New data for prediction
new_data = {'Age': sys.argv[1], 'Sex': sys.argv[2], 'RBC': 0, 'PCV': 0, 'MCV': 0, 'MCH': 0, 'MCHC': 0,
            'RDW': 0, 'TLC': 0, 'PLT /mm3': 0, 'HGB': 0}

print(sys.argv[3])



# Create a DataFrame for the new data
new_df = pd.DataFrame(new_data)
###
newResult = new_df[['Age', 'Sex', 'RBC', 'PCV', 'MCV', 'MCH', 'MCHC', 'RDW', 'TLC', 'PLT /mm3', 'HGB']]

# Make predictions on the new data
pred = clf.predict(newResult)
#
cond = "Healthy"
if pred == 1:
    cond = "Unhealthy - Anemia"

# Get perc. '%' accuracy of the predict result
accuracy_perc = accuracy * 100

print(f"{cond} with {accuracy_perc}% accuracy.")
#
