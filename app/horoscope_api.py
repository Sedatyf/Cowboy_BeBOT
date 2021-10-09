import string
import requests

from lxml import html, etree

import constant


def get_love_life(sign: string) -> string:
    html_tree = get_page(sign)
    etree_object = html_tree.xpath("/html/body/div[4]/div/div[2]/div/div[1]/p")
    return etree_to_string(etree_object).replace("<p>", "").replace("</p>", "")


def get_work_life(sign: string) -> string:
    html_tree = get_page(sign)
    etree_object = html_tree.xpath("/html/body/div[4]/div/div[2]/div/div[2]/p")
    return etree_to_string(etree_object).replace("<p>", "").replace("</p>", "")


def get_finances(sign: string) -> string:
    html_tree = get_page(sign)
    etree_object = html_tree.xpath("/html/body/div[4]/div/div[2]/div/div[3]/p")
    return etree_to_string(etree_object).replace("<p>", "").replace("</p>", "")


def get_page(sign: string):
    parsed_sign = sign.lower().replace("é", "e")
    page = requests.get(constant.HOROSCOPE_LINK + "/" + parsed_sign)
    return html.fromstring(page.content)


def etree_to_string(etree_object):
    return etree.tostring(etree_object[0], encoding='unicode', method='xml')

