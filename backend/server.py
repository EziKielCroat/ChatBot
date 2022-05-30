
# The entire backend is hosted in this python file, the others are just for the machine learning. 

# In intents.json is the actual data it's teached with, don't delete or modify it without a copy.

# The other stuff isn't as important, the requirements.txt file is where you can find the exact versions this was built on.

# .ipynb is used for data analsis, and .pickle is used for seralizing and de-seralizing the object structure. (if anyhow it breaks just revert to old versions of the packages until dev has fixed)
import asyncio
import websockets

import json 
import numpy as np
from tensorflow import keras
from sklearn.preprocessing import LabelEncoder

import random
import pickle

    # load trained model
model = keras.models.load_model('chat_model')

with open('tokenizer.pickle', 'rb') as handle:
    tokenizer = pickle.load(handle)

with open('label_encoder.pickle', 'rb') as enc:
    lbl_encoder = pickle.load(enc)

    # parameters for learning
max_len = 20

async def handler(websocket, path):

  # Determening bot's answer
    with open("intents.json") as file:
        data1 = json.load(file)

    data = await websocket.recv()

    print("Server has recieved message: " + data) 

    while True:
        inp = data

        result = model.predict(keras.preprocessing.sequence.pad_sequences(tokenizer.texts_to_sequences([inp]),
                                             truncating='post', maxlen=max_len))
        tag = lbl_encoder.inverse_transform([np.argmax(result)])

        for i in data1['intents']:
            if i['tag'] == tag:
                botMsg = np.random.choice(i['responses'])
                await websocket.send(botMsg)
                break
        break

start_server = websockets.serve(handler, "localhost", 8000)

asyncio.get_event_loop().run_until_complete(start_server)
 
asyncio.get_event_loop().run_forever()
#await websocket.send(botMsg)
