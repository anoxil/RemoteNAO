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




# ROS NODES (if I ever need multiple nodes at once, use launch)
def getTopImage(nodeName):
    """Script to get the current image of the top camera"""

    print("=======================")
    if nodeName == "null":
        print("node is null")
    else:
        print("node stopped")
    print("=======================")


    import subprocess

    instr = "rosrun nao_remotenao top_camera.py"
    process = subprocess.Popen(instr.split(), stdout=subprocess.PIPE)
    output, error = process.communicate()
    print(output)
