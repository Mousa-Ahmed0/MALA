import pandas as pd
import joblib
import sys


###########################################

# Get trained model
model_filename = 'cbc_trained_model.joblib'
loaded_model = joblib.load(f"utils\\python\\{model_filename}")

# New data for prediction
components_results = [float(value) for value in sys.argv[3].split(',')]

new_data = {'Age': [float(sys.argv[1])], 'Sex': [sys.argv[2]], 'RBC': [components_results[0]], 'PCV': [components_results[1]], 'MCV': [components_results[2]], 'MCH': [components_results[3]], 'MCHC': [components_results[4]],
            'RDW': [components_results[5]], 'TLC': [components_results[6]], 'PLT /mm3': [components_results[7]], 'HGB': [components_results[8]]}

# Create a DataFrame for the new data
new_df = pd.DataFrame(new_data)

# Ensure the order of features is consistent
newResult = new_df[['Age', 'Sex', 'RBC', 'PCV', 'MCV', 'MCH', 'MCHC', 'RDW', 'TLC', 'PLT /mm3', 'HGB']]

# Make predictions on the new data
new_pred = loaded_model.predict(newResult)

# Print the predicted class for the new data
condition = "Healthy" if new_pred == 0 else "Unhealthy - Anemia"
print(condition)

