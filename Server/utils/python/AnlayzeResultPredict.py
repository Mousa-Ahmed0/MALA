import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
import matplotlib.pyplot as plt
import sys


###########################################

# Get Data from .csv file
dataSet = pd.read_csv("../CBC data_for_meandeley_csv.csv")

# Create DataFrame 'df'
df = pd.DataFrame(dataSet)

# Create new DF 'X' with needed labels
X = df.iloc[:, 1:12]

# df for issues: Healthy: 0, Anemia: 1
y = df['disease']

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)  # 20% of the data for testing, and 80% for training.

# Initialize the RandomForestClassifier
clf = RandomForestClassifier(random_state=42, n_estimators=20)  # RandomForestClassifier algorithm

# Train the model
clf.fit(X_train, y_train)

# Make predictions on the test set
y_pred = clf.predict(X_test)

# Evaluate the model on the test set
accuracy = accuracy_score(y_test, y_pred)


# New data for prediction
components_results = [float(value) for value in sys.argv[3].split(',')]

new_data = {'Age': [float(sys.argv[1])], 'Sex': [sys.argv[2]], 'RBC': [components_results[0]], 'PCV': [components_results[1]], 'MCV': [components_results[2]], 'MCH': [components_results[3]], 'MCHC': [components_results[4]],
            'RDW': [components_results[5]], 'TLC': [components_results[6]], 'PLT /mm3': [components_results[7]], 'HGB': [components_results[8]]}

# Create a DataFrame for the new data
new_df = pd.DataFrame(new_data)

# Ensure the order of features is consistent
newResult = new_df[['Age', 'Sex', 'RBC', 'PCV', 'MCV', 'MCH', 'MCHC', 'RDW', 'TLC', 'PLT /mm3', 'HGB']]

# Make predictions on the new data
new_pred = clf.predict(newResult)

# Print feature importances for the new record
new_record_importances = clf.feature_importances_

# Visualize feature importances for the new record
plt.figure(figsize=(10, 6))
plt.bar(X.columns, new_record_importances)
plt.xlabel('Features')
plt.ylabel('Importance')
plt.title('Feature Importances for the New Record')
plt.savefig('./images/chart.jpg')


# Print the predicted class for the new data
condition = "Healthy" if new_pred == 0 else "Unhealthy - Anemia"
print(f"Predicted Condition: {condition}")

