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



def getVideo():
    print("yet to come")
    #cf video.py