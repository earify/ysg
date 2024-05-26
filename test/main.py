import random

print('시작')

new_card = 0
money = 0
origianl_card = 1  # 원본 카드 변수를 전역 변수로 선언

def card_gen():
    return random.randint(1, 4)

def cal(a, b):
    global money  # 전역 변수 사용 선언
    if a == b:
        print('100원 추가')
        money += 100
    return money

def betting():
    global origianl_card  # 전역 변수 사용 선언
    new_card = card_gen()

    print("origianl_card : ", origianl_card)
    print("new_card : ", new_card)
    print("money : ", money)
    cal(origianl_card, new_card)
    origianl_card = new_card  # 전역 변수를 업데이트

while True:
    sans = input()
    betting()
