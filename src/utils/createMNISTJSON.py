from tensorflow import keras
import numpy as np
import json

(x_train, y_train), (x_test, y_test) = keras.datasets.mnist.load_data()

#Reshapes the input data to 784 Vector (before 28x28)
x_train = x_train.reshape(-1, 784).astype(np.float32)
x_test = x_test.reshape(-1, 784).astype(np.float32)


#Converts the labels to one hot vector
y_train = keras.utils.to_categorical(y_train, 10, dtype=np.float32)
y_test = keras.utils.to_categorical(y_test, 10, dtype=np.float32)

#Converts the values to [0, 1]
x_train = np.where(x_train > 100, 1, 0)
x_test = np.where(x_test > 100, 1, 0)

MNISTJson = {
    "x_train": x_train.tolist(),
    "y_train": y_train.tolist(),
    "x_test": x_test.tolist(),
    "y_test": y_test.tolist()
}

with open('MNIST.json', "w") as f:
    json.dump(MNISTJson, f)