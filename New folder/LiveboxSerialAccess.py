import time
from serial import Serial
import re
'''
Created on Apr 26, 2018

@author: LiveboxTeam
'''

DEFAULT_PORT = '/dev/ttyUSB0'
DEFAULT_USERNAME = 'root'
DEFAULT_PASSWORD = 'sah'

class LiveboxSerialAccess():
    '''
    classdocs
    '''
    ROBOT_LISTENER_VERSION = 3

    @property
    def listener(self):
        return self

    def _close(self, *args, **kwargs):
        print('close')
        #self.stop_all_android()

    def __enter__(self):
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.logger.info('LiveboxSerialAccess exit....')


    def __init__(self,port=DEFAULT_PORT):
        """
        Constructor for opening serial connection
        """
	self.port = port
        self.ser = Serial(port, baudrate=115200, timeout=5)
        #global ser
        #with serial.Serial('/dev/ttyUSB0', 115200, timeout=5) as self.ser:
        i = 0
        print ("inside openconnection")
        while self.ser.is_open != True and i < 20:
            i = i + 1
            time.sleep(1)
        console = self.ser.readline()
        print(console)
        print("open connection done")

    def open_connection(self, port=DEFAULT_PORT) :
        self.__init__(DEFAULT_PORT)

    def _read_serial_until(self, s_need, max_lines=1000):
        log_text = ''
        i = 0
        reading = self.ser.readline().decode('utf-8')
        while reading.find(s_need) < 0 and i < max_lines:
            i = i + 1
            # using ser.readline() assumes each line contains a single reading
            # sent using Serial.println() on the Arduino
            reading = self.ser.readline().decode('utf-8')
            # reading is a string...do whatever you want from here
            log_text = log_text + '\n' + reading
            print(reading)
        return log_text

    def serial_login(self, loginid=DEFAULT_USERNAME, password=DEFAULT_PASSWORD):
        """
        Perform login in serial access with livebox credentials. Please make sure that already opened serial access instance should be closed
        ``loginid``:    livebox console login id
        ``password``:    livebox console password
        """
        print("inside login function")
	self.ser.write("a\n")
        test = self.ser.read(800)
        print ("python output after a preseed is "+test)
        self.ser.flush()
        time.sleep(4)
        self.ser.write(str(loginid)+"\n")
        self.ser.flush()
        time.sleep(4)
        self.ser.write(str(password)+"\n")
        logins = self.ser.read(1000)
        print("python login output is "+logins)
        self.ser.flush()
        time.sleep(5)
        return logins

    def serial_write_STB(self, command):
        print("inside write function")
	self.ser.write(str(command)+"\n")
	output = self.ser.read(1000)
	#output=self._read_serial_until(b'> ')
	time.sleep(4)
	#output = self._read_serial_until('>')
	print("python output " + output)
	op=output.split('=')
	print("param value is "+op[1])
        self.ser.flush()
	time.sleep(4)
	return op[1]

    def serial_write_console_STB(self, command):
        print("inside write function")
        self.ser.write(str("pcb_cli")+"\n")
	self.ser.write(str(command)+"\n")
	time.sleep(4)
	output = self._read_serial_until('#')
	print("python output " + output)
	self.ser.flush()
	time.sleep(4)
	print("output =======" +output)
	self.ser.write(str("exit")+"\n")

    def serial_login_STB(self):
        """
        Perform login in serial access on STB Please make sure that already opened serial access instance should be closed
        """
        print("inside login function")
	self.ser.write("a\n")
        test = self.ser.read(800)
        print("python output after a preseed is "+test)
        self.ser.flush()
        time.sleep(4)
        return test

    def reset_and_reboot(self):
        """
        Perform reset hard and then reboot the device
        """
	self.ser.write("reset_hard\n")  
        test =self.ser.read(1000)
        print("output of reset_hard is " + test)
        if "reboot the device" not in test:
            sys.exit("reset_hard was not successful")
        time.sleep(10)
        self.ser.flush()
        self.ser.write("reboot\n")
        time.sleep(4)
        i = 0
        while i < 40:
        	i = i + 1
                self.ser.write("r")
                time.sleep(1)
        self.ser.write("e\n")
        rebootStatus=self.ser.read(1000)
        j=0
        while j < 45:
                j = j + 1
                Status=self.ser.read(1000)
                time.sleep(5)
                rebootStatus=str(rebootStatus)+str(Status)
                if "Hit any key to stop autoboot" in rebootStatus:
                    break
        print("python reboot output is "+ rebootStatus)   
        time.sleep(5)  
        return rebootStatus 

    def device_set_TFTP_server(self, IP):
        """
        configure tftp server on livebox

        ``IP``:         tftp server ip address
        """
        time.sleep(5)
        command = str("setenv serverip " + IP)
        self.ser.write(command + "\n")
        time.sleep(4)
        resetStatus = self.ser.read(1000)
        print(resetStatus)
        self.ser.flush()
        time.sleep(20)
        print("set server ip done \n")
        return resetStatus

    def device_load_operational_mode_image(self):
        """
        Load operation mode image from tftp to livebox
        """
        time.sleep(30)
        self.ser.write("run load_oper\n")
        time.sleep(4)
        statusOper = self.ser.read(1000)
        j = 0
        while j < 40:
            j = j + 1
            Status = self.ser.read(1000)
            time.sleep(1)
            statusOper = str(statusOper) + str(Status)
            if "Volume \"operational\" found at volume id" in statusOper:
                break
        print("python Oper mode output is " + statusOper)
        self.ser.flush()
        time.sleep(20)
        self.ser.write("\n")
        return statusOper

    def device_load_rescue_mode_image(self):
        """
        Load Rescue mode image from tftp to livebox
        """
        time.sleep(20)
        self.ser.write("run load_resc\n")
        time.sleep(6)
        statusResc = self.ser.read(1000)
        j = 0
        while j < 40:
            j = j + 1
            Status = self.ser.read(1000)
            time.sleep(1)
            statusResc = str(statusResc) + str(Status)
            if "Volume \"rescue\" found at volume id" in statusResc:
                break
        print("python Rescue mode output is " + statusResc)
        time.sleep(2)
        self.ser.flush()
        return statusResc

    def device_boot(self):
        """
        Boot livebox to load new configuration
        """
        time.sleep(20)
        self.ser.write("boot\n")
        time.sleep(20)
        bootstatus = self.ser.read(1000)
        j = 0
        while j < 50:
            j = j + 1
            Status = self.ser.read(1000)
            time.sleep(5)
            bootstatus = str(bootstatus) + str(Status)
            if "Sysinit done" in bootstatus:
                break
        print("python boot mode output is " + bootstatus)
        time.sleep(2)
        self.ser.flush()
        self.ser.write("\n")
        time.sleep(2)
        lastline = self.ser.read(1000)
        print("After boot last line is  " + lastline)
        return bootstatus

    def close_session(self):
        """
        close the opened serial session

        """
        self.ser.close()
		
    def delete_file(self, path):
	self.ser.write("rm -f "+ str(path)+"\n") 
	status = self.ser.read(1000)
	return status

    def copy_log_file(self, destinationpath, propertyFilePath):
        """
        read and return the content of /var/log/message file 
		
        ``destinationpath``:    full oath where user want to save the log file,
        recommended to give path of usb-key
        otherwise the file can be removed by a reboot
		
		``propertyFilePath``:  propertyFile path to read "stoplog" variable value (to check when to stop log reading)
        """
        self.ser.write("tail -f /var/log/messages | tee -a " + str(destinationpath) + "\n")
        data = self.ser.read(1000)
        j = self.load_properties(propertyFilePath)
        value = int(j['stoplog'])
        while value == 0:
            time.sleep(1)
            logdata = self.ser.read(1000)
            data = str(data) + str(logdata)
            print("before if data is " + logdata)
            j = self.load_properties(propertyFilePath)
            value = int(j['stoplog'])
            if ("system reboot triggered" in data) or ("Sysinit done" in data):
                time.sleep(30)
                if "system reboot triggered" in data:
                    print ("system reboot came")
                    i = 0
                    while i < 300:
                        i = i + 1
                        time.sleep(1)
                        logdata = self.ser.read(1000)
                        data = str(data) + str(logdata)
                        print ("before if data is inside system reboot " + logdata)
                        if "Sysinit done" in data:
                            print ("inside reboot sysinit got")
                            break
                time.sleep(60)
                self.serial_login("root", "sah")
		self.copy_log_file(destinationpath, propertyFilePath)
                #dirpath = destinationpath[:-4]
                #destinationpath = dirpath + "AfterReboot.txt"
                #self.ser.write("tail -f /var/log/messages | tee " + str(destinationpath) + "\n")
                #break
        return data

    def load_properties(self, filepath, sep='=', comment_char='#'):
        """
        Read the file passed as parameter as a properties file.
        """
        props = {}
        with open(filepath, "rt") as f:
            for line in f:
                l = line.strip()
                if l and not l.startswith(comment_char):
                    key_value = l.split(sep)
                    key = key_value[0].strip()
                    value = sep.join(key_value[1:]).strip().strip('"')
                    props[key] = value
        return props

    def exit_from_log_Reading(self):
        self.ser.write("\x03")
        data = self.ser.read(1000)
        print (data)
        return data

    def is_file_present(self, Filepath):
        self.ser.write("ls -l " + str(Filepath) + "\n")
        data = self.ser.read(1000)
        if "No such file" in data:
            return "false"
        return "true"

    def fetchMultipleParam(self,command):
       self.ser.write(str(command)+"\n")
       self.ser.flush()
       output = self.ser.read(9000)
       escaped_line = self._escape_ansi(output)
       escaped_line1= escaped_line.replace(">","")
       atr_value = list(escaped_line1.split('\r\n'))
       return atr_value

       
    def _escape_ansi(self,line):
       ansi_escape = re.compile(r'(\x9B|\x1B\[)[0-?]*[ -/]*[@-~]')
       return ansi_escape.sub('', line)

    def fetchSingleDataParam(self,command):
        time.sleep(20)
        print("inside write function")
        self.ser.write(str(command)+"\n")
        output = self.ser.read(1000)
        time.sleep(4)
        print("python output " + output)
        op=output.split('=')
        print("param value is "+op[1])
        self.ser.flush()
        time.sleep(4)
        return op[1]
        

    def getMacAddress(self):
        mac_address=self.fetchSingleDataParam("Device.LAN.MACAddress.?")
        print("mac address is"+mac_address)

    def getSoftwareVersion(self):
        software_version=self.fetchSingleDataParam("Device.DeviceInfo.SoftwareVersion.?")
        print("software version is"+software_version)

    def getHardwareVersion(self):
        hardware_version=self.fetchSingleDataParam("Device.DeviceInfo.HardwareVersion.?")
        print("hardware version is"+hardware_version)

    def getDeviceStatus(self):
        device_status=self.fetchSingleDataParam("Device.DeviceInfo.DeviceStatus.?")
        print("device status is"+device_status)

    def getSerialNumber(self):
        serial_num=self.fetchSingleDataParam("Device.DeviceInfo.HardwareVersion.?")
        print("serial version is"+serial_num)

    def getLanConnectionIP(self):
        lan_ipaddress=self.fetchSingleDataParam("Device.LAN.IPAddress.?")
        print("LAN Connecton ip is"+lan_ipaddress)

    def getDeviceInfo(self):
        device_info=self.fetchMultipleParam("Device.DeviceInfo.?")
        print("device info is")
        print(device_info)

    def getLastKarmaContact(self):
        last_con=self.fetchSingleDataParam("Device.ManagementServer.X_ORANGE-COM_LastSuccessfulInformTime.?")
        print("Last Connection is")
        print(last_con)

    def getConnectionStatus(self):
       self.ser.write(str("ConnectionManager.Client.Common.GetConnectionState()")+"\n")
       output = self.ser.read(9000)
       self.ser.flush()
       time.sleep(5)
       escaped_line = self._escape_ansi(output)
       escaped_line1= escaped_line.replace(")"," ")
       atr_value = list(escaped_line1.split('('))
       print("23444")
       print(atr_value[1])
       return atr_value


if __name__ == '__main__':
    import logging
    logging.basicConfig(level=logging.INFO)
    livebox_serial_access=LiveboxSerialAccess('/dev/ttyUSB1')
    livebox_serial_access.serial_login('root','sah')
    livebox_serial_access.getConnectionStatus()
    livebox_serial_access.getMacAddress()
    livebox_serial_access.getSoftwareVersion() 
    livebox_serial_access.getHardwareVersion() 
    livebox_serial_access.getDeviceStatus() 
    livebox_serial_access.getSerialNumber()
    livebox_serial_access.getLanConnectionIP()
    livebox_serial_access.getDeviceInfo()
    livebox_serial_access.getLastKarmaContact()



# sAccess = SerialAccess()
# sAccess.Seriallogin("root","sah")
# sAccess.copylogfile("cfg/system/root/messagesBackup.txt","/var/lib/jenkins/workspace/StartLogbackup/propertyfile.txt")
# sAccess.reset_reboot()
# sAccess.copylogfile("/cfg/system/root/messagesBackup.txt")
# time.sleep(20)
# sAccess.ExitfromlogReading()
# sAccess.device_Set_ServerIP("192.168.1.2")
# aa=sAccess.device_Set_OperMode()
# print "end main oper"+aa
# bb=sAccess.device_Set_RescMode()
# print bb
# cc=sAccess.device_Boot()
# print cc
