import os, time, logging, subprocess

from socketIO_client_nexus import SocketIO
import urllib3
urllib3.disable_warnings()

from naoqi import ALProxy

import nao_scripts

#####

IP = "192.168.43.161"
PORT = 9559

tts = ALProxy("ALTextToSpeech", IP , PORT)
rp = ALProxy("ALRobotPosture", IP, PORT)

tts.setLanguage("French")
tts.setParameter("pitchShift", 1)

#####

#logging.getLogger('socketIO-client').setLevel(logging.DEBUG)
socketIO = SocketIO('https://remote-nao.herokuapp.com')

#####
 

def connect():
    print('connected to the server')
    socketIO.emit('authentication', {'key': os.environ['SOCKET_KEY']})
    socketIO.on('authenticated', authenticated)
    socketIO.emit('piConnected')

def reconnect():
    print('reconnected to the server')
    socketIO.emit('piConnected')

def on_disconnect():
    print('disconnected')
    socketIO.emit('piDisconnected')

def authenticated(*args):
    print('RPI is connected to the Server')

def instruction_received(*args):
    nao_scripts.instruction(tts, rp, args)

def get_top_image(*args):
    nao_scripts.getTopImage(args[0])

def start_teleop():
    instr = "rosrun nao_remotenao teleop_rn.py"
    process = subprocess.Popen(instr.split(), stdout=subprocess.PIPE)
    output, error = process.communicate()


def main():

    #start_teleop()
    
    socketIO.on('connect', connect)

    socketIO.on('reconnect', reconnect)

    socketIO.on('disconnect', on_disconnect)

    socketIO.on('instruction_to_host', instruction_received)

    socketIO.on('asking_for_img', get_top_image)

    # Keeps the socket open indefinitely...
    socketIO.wait()

if __name__ == '__main__':
    try:
        main()
    except KeyboardInterrupt:
        print('Killed by user')
        sys.exit(0)
