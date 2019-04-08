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



def getTopImage():
    """Script to get the current image of the top camera"""
    # upgradable to a node listening to topic (cf. http://wiki.ros.org/ROS/Tutorials/WritingPublisherSubscriber%28python%29)

    #check topic path && add -p for csv style
    instr = "rostopic echo -n 1 /nao_robot/camera/top/camera/image_raw"
    process = subprocess.Popen(instr.split(), stdout=subprocess.PIPE, cwd='~/')
    output, error = process.communicate()

    #split if -p, but understand how no -p works
    #store the data in img_bgr

    img_np_reshaped = np.reshape(np.asarray(img_bgr), (240,320,3))
    im = Image.fromarray(img_np_reshaped.astype("uint8"))
    rawBytes = io.BytesIO()
    im.save(rawBytes, "PNG")
    rawBytes.seek(0)
    
    return base64.b64encode(rawBytes.read())