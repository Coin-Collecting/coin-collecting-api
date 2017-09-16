from urllib.request import urlopen
from bs4 import BeautifulSoup
import csv

coin_pages = [
'http://www.coindatabase.com/coin_usa.php?id=954',
'http://www.coindatabase.com/coin_usa.php?id=2',
'http://www.coindatabase.com/coin_usa.php?id=1316',
'http://www.coindatabase.com/coin_usa.php?id=1326',
'http://www.coindatabase.com/coin_usa.php?id=0',
'http://www.coindatabase.com/coin_usa.php?id=1771',
'http://www.coindatabase.com/coin_usa.php?id=2255',
'http://www.coindatabase.com/coin_usa.php?id=2264',
'http://www.coindatabase.com/coin_usa.php?id=2668',
'http://www.coindatabase.com/coin_usa.php?id=3088',
'http://www.coindatabase.com/coin_usa.php?id=3342',
'http://www.coindatabase.com/coin_usa.php?id=3418',
'http://www.coindatabase.com/coin_usa.php?id=3612',
'http://www.coindatabase.com/coin_usa.php?id=3656',
'http://www.coindatabase.com/coin_usa.php?id=3661',
'http://www.coindatabase.com/coin_usa.php?id=3946',
'http://www.coindatabase.com/coin_usa.php?id=4170'
]

for pg in coin_pages:

    coinData = []

    page = urlopen(pg)

    soup = BeautifulSoup(page, 'html.parser')

    # Finds All Varieties
    headers = soup.find_all('table', attrs={'class': 'innercoins topping'})

    filename = 'scraped_data/' + headers[0].find('h2').text.strip().replace(' ', '').replace('.', '').replace('/', '-') + '.csv'

    with open(filename, 'a') as csv_file:
        writer = csv.writer(csv_file)
        writer.writerow(['denomination', 'variety_name', 'diameter', 'weight', 'composition', 'year', 'mint_name', 'mintage', 'notes'])

    # Loops through all varieties
    for header in headers:
        denomination = header.find('h2').text.strip()
        variety_name = header.find('th', attrs={'width': '55%'}).text.strip()


        #finds data for the coins such as diameter, weight and composition
        coin_data_table = header.find_next_siblings('table', attrs={'class': 'innercoins scnd'})

        diameter = coin_data_table[0].find('td', attrs={'width': '56%'}).find('ul').contents[1].text.strip()[10:-3].replace(',', '.')
        weight = coin_data_table[0].find('td', attrs={'width': '56%'}).find('ul').contents[5].text.strip()[8:-3].replace(',', '.')
        composition = coin_data_table[0].find('td', attrs={'width': '56%'}).find('ul').contents[7].text.strip().replace(',', '+').replace(' ', '').replace('%', '')


        coin_info_table = coin_data_table[0].find_next_siblings('table', attrs={'class': 'innercoins thrd'})
        coins = coin_info_table[0].find_all('tr', attrs={'class', 'hl hllnk'})

        for coin in coins:
            year = coin.contents[3].text.strip()[:4]
            mint_name = coin.contents[5].text.strip()
            mintage = '0'
            if coin.contents[7].text.strip() != 'not available':
                mintage = coin.contents[7].text.strip()
            notes = coin.contents[9].text.strip()

            data_row = (denomination, variety_name, diameter, weight, composition, year, mint_name, mintage, notes)
            print(data_row)
            coinData.append(data_row)

            with open(filename, 'a') as csv_file:
                writer = csv.writer(csv_file)
                writer.writerow([denomination, variety_name, diameter, weight, composition, year, mint_name, mintage, notes])
