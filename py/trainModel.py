import tensorflow as tf
import numpy as np
from tensorflow.keras.optimizers import Adam
from tensorflow.keras.models import Sequential
from tensorflow.keras import Model
from tensorflow.keras.utils import to_categorical
from tensorflow.keras.layers import Dense, Conv2D, MaxPooling2D, Flatten, Input, Activation
from tensorflow.keras.datasets import mnist
import tensorflowjs as tfjs


(x_train, y_train), (x_test, y_test) = mnist.load_data()

# Expand dims to (28, 28, 1) (before 28x28)
x_train = x_train.astype(np.float32) / 255
x_train = np.expand_dims(x_train, axis=-1)

x_test = x_test.astype(np.float32) / 255
x_test = np.expand_dims(x_test, axis=-1)

# Converts the labels to one hot vector
y_train = to_categorical(y_train, 10, dtype=np.float32)
y_test = to_categorical(y_test, 10, dtype=np.float32)

#Builds the Model
def buildModel():
    input = Input(shape=(28, 28, 1))
    x = Conv2D(filters=32, kernel_size=3)(input)
    x = Activation(activation="relu")(x)
    x = Flatten()(x)
    x = Dense(units=10)(x)
    x = Activation(activation="softmax")(x)
    y_pred = (x)

    model = Model(
        inputs=[input],
        outputs=[y_pred]
    )

    model.summary()

    return model


if __name__ == "__main__":

    #Create Model
    model = buildModel()

    #Compiles the Model
    model.compile(
        loss="categorical_crossentropy",
        optimizer=Adam(),
        metrics=["accuracy"]
    )

    #Trains the Model
    model.fit(
        x=x_train,
        y=y_train,
        epochs=10,
        batch_size=128
    )

    #Evaluates the Model
    scores = model.evaluate(
        x=x_test,
        y=y_test
    )

    #Save Model
    model.save_weights("models.h5")

    tfjs.converters.save_keras_model(
        model, "C:/Users/nicla/Desktop/Programming/NNWebsite/MNISTClassifier")
