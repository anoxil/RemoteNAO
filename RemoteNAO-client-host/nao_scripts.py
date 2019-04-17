# NAOQI
def instruction(tts, rp, *args):
    """Automaticaly calls the instructions you wish to execute on your NAO"""

    #get values
    if (type(args[0][0]) is unicode): #si ce n'est qu'une instruction
        instr = args[0][0]
    else: #si on y ajoute un parametre
        instr = args[0][0]["0"]
        param = args[0][0]["1"]

    #commands
    if instr == "helloworld":
        tts.say("prostrai prosternai")

    elif instr == "saytext":
        param = param.encode('ascii', 'replace')
        tts.say(param)

    elif instr == "lyingground":
        rp.goToPosture("LyingBelly", 1.0)

    elif instr == "sit":
        rp.goToPosture("Sit", 1.0)

    elif instr == "standup":
        rp.goToPosture("Stand", 1.0)

    else:
        tts.say("Je n'ai pas compris votre demande.")




# ROS (if I ever need multiple nodes at once, use launch)
def getTopImage(nodeName):
    """Script to get the current image of the top camera"""
    
    import subprocess


    if nodeName != "null":
        print("Killing top camera node...")
        instr = "rosnode kill " + nodeName
        process = subprocess.Popen(instr.split(), stdout=subprocess.PIPE)
        output, error = process.communicate()
        return

    print("coucou")

    instr = "rosrun nao_remotenao top_camera.py"
    process = subprocess.Popen(instr.split(), stdout=subprocess.PIPE)
    output, error = process.communicate()

def changeMovement(instruction):
    """Function to change the speed and direction of the robot"""

    import subprocess

    process = subprocess.Popen(instruction.split(), stdout=subprocess.PIPE)
    output, error = process.communicate()



"""
do posture : #pour en creer de nouvelles, go dans choregraphe, positionner le NAO comme on le souhaite, enregistrer la position dans le panel de pose, exporter le fichier, et enfin placer ce dernier dans "roscd naoqi_pose/config/" a cote ou a la place de basic.xap
    StandInit : rosrun naoqi_pose execute_pose.py "StandInit"
    Stand     : rosrun naoqi_pose execute_pose.py "Stand"

walking : #valeur entre 0 et 1 correspondent a la portee du pas
    marche en avant : rostopic pub -1 /cmd_vel geometry_msgs/Twist '{linear: {x: 1.0, y: 0.0, z: 0.0}, angular: {x: 0.0, y: 0.0, z: 0.0}}'      # negatif = arriere
    marche en crabe : rostopic pub -1 /cmd_vel geometry_msgs/Twist '{linear: {x: 0.0, y: 1.0, z: 0.0}, angular: {x: 0.0, y: 0.0, z: 0.0}}'      # negatif = vers droite
    marche tournant : rostopic pub -1 /cmd_vel geometry_msgs/Twist '{linear: {x: 1.0, y: 0.0, z: 0.0}, angular: {x: 0.0, y: 0.0, z: 1.0}}'      # negatif = vers droite
"""
