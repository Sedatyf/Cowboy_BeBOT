import string

import constant


def find_match(message: string):
    word_list = message.split(" ")
    set_match = set(word_list).intersection(constant.HOROSCOPE_LIST)
    match = "".join(set_match)

    if match == "":
        return False
    else:
        return match


