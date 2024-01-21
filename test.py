import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
import matplotlib.pyplot as plt

###########################################
print("---Start of Program---")

# Get Data from .csv file
dataSet = pd.read_csv("CBC data_for_meandeley_csv.csv")

# Create DataFrame 'df'
df = pd.DataFrame(dataSet)

# Create new DF 'X' with needed labels
X = df.iloc[:, 1:12]

# df for issues: Healthy: 0, Anemia: 1
y = df['disease']

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)  # 20% of the data for testing, and 80% for training.

# Initialize the RandomForestClassifier
clf = RandomForestClassifier(random_state=42, n_estimators=100)  # RandomForestClassifier algorithm

# Train the model
clf.fit(X_train, y_train)

# Make predictions on the test set
y_pred = clf.predict(X_test)

# Evaluate the model on the test set
accuracy = accuracy_score(y_test, y_pred)
print("--- Model Evaluation on Test Set: ---")
print(f"Accuracy on Test Set: {accuracy * 100:.2f}%")

# Print feature importances for the entire dataset
print("--- Feature Importances for the Entire Dataset: ---")
feature_importances = clf.feature_importances_
for feature, importance in zip(X.columns, feature_importances):
    print(f"{feature}: {importance}")

# Visualize feature importances for the entire dataset
plt.figure(figsize=(10, 6))
plt.bar(X.columns, feature_importances)
plt.xlabel('Features')
plt.ylabel('Importance')
plt.title('Feature Importances for the Entire Dataset')
plt.show()

# New data for prediction
new_data = {'Age': [38], 'Sex': [0], 'RBC': [3.47], 'PCV': [30.02], 'MCV': [88.78], 'MCH': [29.65], 'MCHC': [29.45],
            'RDW': [14.54], 'TLC': [8.55], 'PLT /mm3': [225.44], 'HGB': [2.55]}

# Create a DataFrame for the new data
new_df = pd.DataFrame(new_data)

# Ensure the order of features is consistent
newResult = new_df[['Age', 'Sex', 'RBC', 'PCV', 'MCV', 'MCH', 'MCHC', 'RDW', 'TLC', 'PLT /mm3', 'HGB']]

# Make predictions on the new data
new_pred = clf.predict(newResult)

# Print feature importances for the new record
print("--- Feature Importances for the New Record: ---")
new_record_importances = clf.feature_importances_
for feature, importance in zip(X.columns, new_record_importances):
    print(f"{feature}: {importance}")

# Visualize feature importances for the new record
plt.figure(figsize=(10, 6))
plt.bar(X.columns, new_record_importances)
plt.xlabel('Features')
plt.ylabel('Importance')
plt.title('Feature Importances for the New Record')
plt.show()

# Print the predicted class for the new data
print("--- New Data Prediction: ---")
condition = "Healthy" if new_pred == 0 else "Unhealthy - Anemia"
print(f"Predicted Condition: {condition}")

# Evaluate the model on the new data (Note: You may not have true labels for the new data to evaluate accuracy)
print("________________________________________________")
