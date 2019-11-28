import os

work_dir = os.path.join(os.path.dirname(os.path.realpath(__file__)))

lines = [
    'web_addr: 0.0.0.0:4040',
    'region: eu'
]

ngrok_token = os.environ.get('NGROK_TOKEN', None)

if ngrok_token:
    lines.append(f'authtoken: {ngrok_token}')

with open(os.path.join(work_dir, 'ngrok.yml'), 'w') as f:
    f.write('\n'.join(lines))
