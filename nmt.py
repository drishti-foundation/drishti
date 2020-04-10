import requests
import json


def nmt(text):

    # Defining POST response to call Reverie API
    url = "https://hackapi.reverieinc.com/nmt"
    headers = {"Content-Type": "application/json",
               "token": "d4b6f130928765eaa5cf9c632f7c7eca55f3fb5d"
               }
    data = {"data": [text], "tgt": "hi", "src": "en"}

    r = requests.post(url, data=json.dumps(data), headers=headers)
    print(r.json())
    # If API does not return anything
    if r.json().get('statu') == 'Error':
        raise RuntimeError(
            f"ReverieAPIError: API did not return. Gave error \'{r.json().get('message').get('details')}\'")
        return str()

    res = r.json().get('data').get('result')[0][0]

    return res


if __name__ == "__main__":
    with open('test.txt', 'r') as f:
        print(nmt(f.read()))
