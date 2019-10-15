from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import csv
import string
import time

# open the browser on the search page
driver = webdriver.Firefox() #replace with .Firefox(), or with the driver of your choice
courseDetailsUrl = 'https://info.braude.ac.il/yedion/fireflyweb.aspx?prgname=S_LOOK_FOR_NOSE&arguments=-N'
listOfCoursesUrl = "https://info.braude.ac.il/yedion/fireflyweb.aspx?prgname=S_LOOK_FOR_NOSE_AB&arguments=-N2"
driver.get(courseDetailsUrl) #navigate to the page

lecTypeList = ['סדנה','מעבדה','תרגול','הרצאה']

with open('AllCourses.csv', 'r', encoding='utf-8') as csv_input_file:
    spamreader = csv.reader(csv_input_file, delimiter=',', quotechar='|')

    with open('lecturesFinal.txt', 'w', encoding='utf-8') as output_file:
              
        for row in spamreader:
            # extract lectures and practicies
            courseNo = str(row[0])
            driver.get(courseDetailsUrl+courseNo) #navigate to the page
            elem = driver.find_elements_by_class_name("text")
            print(courseDetailsUrl+courseNo)
            for x in range(len(elem)):
                elem[x] = elem[x].text
                                
                if(elem[x].find('תרגיל') != -1):
                    try:
                        lecType = elem[x].split(':')[0].split()[2]
                        lecName = elem[x] = elem[x].split(':')[2]
                        print(row[0] + "," + row[1] +","+ lecName +","+ lecType+"\n")
                        output_file.write(row[0] + "," + row[1] +","+ lecName +","+ lecType+"\n")
                    except Exception as e:
                        lotteryDate = None
                        print("ERROR IN: " + row[0] + "," + row[1] +","+ lecName +","+ lecType+"\n\n\n\n\n\n\n")
                    
                elif(elem[x].find('הרצאה') != -1):
                    try:
                        lecType = elem[x].split(':')[0].split()[2]
                        lecName = elem[x] = elem[x].split(':')[2]
                        print(row[0] + "," + row[1] +","+ lecName +","+ lecType+"\n")
                        output_file.write(row[0] + "," + row[1] +","+ lecName +","+ lecType+"\n")
                    except Exception as e:
                        lotteryDate = None
                        print("ERROR IN: " + row[0] + "," + row[1] +","+ lecName +","+ lecType+"\n\n\n\n\n\n\n")
                        
                elif(elem[x].find('מעבדה') != -1):
                    try:
                        lecType = elem[x].split(':')[0].split()[2]
                        lecName = elem[x] = elem[x].split(':')[2]
                        print(row[0] + "," + row[1] +","+ lecName +","+ lecType+"\n")
                        output_file.write(row[0] + "," + row[1] +","+ lecName +","+ lecType+"\n")
                    except Exception as e:
                        lotteryDate = None
                        print("ERROR IN: " + row[0] + "," + row[1] +","+ lecName +","+ lecType+"\n\n\n\n\n\n\n")
                        
                elif(elem[x].find('סדנה') != -1):
                    try:
                        lecType = elem[x].split(':')[0].split()[2]
                        lecName = elem[x] = elem[x].split(':')[2]
                        print(row[0] + "," + row[1] +","+ lecName +","+ lecType+"\n")
                        output_file.write(row[0] + "," + row[1] +","+ lecName +","+ lecType+"\n")
                    except Exception as e:
                        lotteryDate = None
                        print("ERROR IN: " + row[0] + "," + row[1] +","+ lecName +","+ lecType+"\n\n\n\n\n\n\n")
            # go back to the
            #driver.execute_script("window.history.go(-1)")
