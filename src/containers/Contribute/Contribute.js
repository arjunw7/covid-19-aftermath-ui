import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {Link, withRouter} from 'react-router-dom';
import Navbar from "../../components/Navbar/Navbar";
import { addCompany } from '../../actions/company-action'
import './Contribute.css'
import Loader from "../App/Loader";
import {
    Form,
    Input,
    Button,
    Radio,
    AutoComplete,
    Cascader,
    DatePicker,
    InputNumber,
    TreeSelect,
    Switch,
} from 'antd';

const locationOptions = [
    { value: "Aba"},
    { value: "Abidjan"},
    { value: "Abomey Calavi"},
    { value: "Abu Dhabi"},
    { value: "Abuja"},
    { value: "Acapulco De Juarez"},
    { value: "Accra"},
    { value: "Ad Dammam"},
    { value: "Adana"},
    { value: "Adelaide"},
    { value: "Aden"},
    { value: "Agadir"},
    { value: "Agra"},
    { value: "Aguascalientes"},
    { value: "Ahmedabad"},
    { value: "Ahvaz"},
    { value: "Aleppo"},
    { value: "Alexandria"},
    { value: "Algiers"},
    { value: "Aligarh"},
    { value: "Allahabad"},
    { value: "Almaty"},
    { value: "Amman"},
    { value: "Amravati"},
    { value: "Amritsar"},
    { value: "Amsterdam"},
    { value: "Ankara"},
    { value: "Anqing"},
    { value: "Ansan"},
    { value: "Anshan"},
    { value: "Antalya"},
    { value: "Antananarivo"},
    { value: "Antipolo"},
    { value: "Ar Rayyan"},
    { value: "Aracaju"},
    { value: "Arequipa"},
    { value: "Asansol"},
    { value: "Ashgabat"},
    { value: "Asmara"},
    { value: "Astana"},
    { value: "Asuncion"},
    { value: "Athens"},
    { value: "Auckland"},
    { value: "Aurangabad"},
    { value: "Austin"},
    { value: "Baghdad"},
    { value: "Bahawalpur"},
    { value: "Baishan"},
    { value: "Baixada Santista"},
    { value: "Baku"},
    { value: "Bamako"},
    { value: "Bandar Lampung"},
    { value: "Bandung"},
    { value: "Bangalore"},
    { value: "Banghazi"},
    { value: "Bangkok"},
    { value: "Bangui"},
    { value: "Banjarmasin"},
    { value: "Baoding"},
    { value: "Baoji"},
    { value: "Baotou"},
    { value: "Barcelona"},
    { value: "Barcelona Puerto La Cruz"},
    { value: "Bareilly"},
    { value: "Barquisimeto"},
    { value: "Barranquilla"},
    { value: "Basra"},
    { value: "Batam"},
    { value: "Bazhong"},
    { value: "Beijing"},
    { value: "Beirut"},
    { value: "Bekasi"},
    { value: "Belem"},
    { value: "Belgaum"},
    { value: "Belgrade"},
    { value: "Belo Horizonte"},
    { value: "Bengbu"},
    { value: "Benguela"},
    { value: "Benin City"},
    { value: "Benxi"},
    { value: "Bergamo"},
    { value: "Berlin"},
    { value: "Bhavnagar"},
    { value: "Bhiwandi"},
    { value: "Bhopal"},
    { value: "Bhubaneswar"},
    { value: "Bien Hoa"},
    { value: "Bikaner"},
    { value: "Binzhou"},
    { value: "Birmingham"},
    { value: "Bishkek"},
    { value: "Blantyre Limbe"},
    { value: "Bobo Dioulasso"},
    { value: "Bogor"},
    { value: "Bogota"},
    { value: "Bogra"},
    { value: "Bologna"},
    { value: "Bordeaux"},
    { value: "Boston"},
    { value: "Bozhou"},
    { value: "Brasilia"},
    { value: "Brazzaville"},
    { value: "Brisbane"},
    { value: "Brussels"},
    { value: "Bucaramanga"},
    { value: "Bucharest"},
    { value: "Bucheon"},
    { value: "Budapest"},
    { value: "Buenos Aires"},
    { value: "Buffalo City"},
    { value: "Bujumbura"},
    { value: "Bukavu"},
    { value: "Bur Sa'id"},
    { value: "Bursa"},
    { value: "Busan"},
    { value: "Cabinda"},
    { value: "Cagayan De Oro City"},
    { value: "Cairo"},
    { value: "Calgary"},
    { value: "Cali"},
    { value: "Campinas"},
    { value: "Campo Grande"},
    { value: "Can Tho"},
    { value: "Cape Town"},
    { value: "Cartagena"},
    { value: "Casablanca"},
    { value: "Cebu City"},
    { value: "Chandigarh"},
    { value: "Changchun"},
    { value: "Changde"},
    { value: "Changsha"},
    { value: "Changshu"},
    { value: "Changwon"},
    { value: "Changzhi"},
    { value: "Changzhou"},
    { value: "Chaozhou"},
    { value: "Charlotte"},
    { value: "Chelyabinsk"},
    { value: "Chengde"},
    { value: "Chengdu"},
    { value: "Chennai"},
    { value: "Chenzhou"},
    { value: "Cheongju"},
    { value: "Cherthala"},
    { value: "Chiang Mai"},
    { value: "Chicago"},
    { value: "Chifeng"},
    { value: "Chihuahua"},
    { value: "Chittagong"},
    { value: "Chon Buri"},
    { value: "Chongqing"},
    { value: "Ciudad Guayana"},
    { value: "Cixi"},
    { value: "Cochabamba"},
    { value: "Coimbatore"},
    { value: "Cologne"},
    { value: "Columbus"},
    { value: "Conakry"},
    { value: "Concepcion"},
    { value: "Copenhagen"},
    { value: "Cucuta"},
    { value: "Cuernavaca"},
    { value: "Culiacan"},
    { value: "Cuttack"},
    { value: "Da Nang"},
    { value: "Daegu"},
    { value: "Daejon"},
    { value: "Dakar"},
    { value: "Dalian"},
    { value: "Dallas"},
    { value: "Damascus"},
    { value: "Dandong"},
    { value: "Danyang"},
    { value: "Daqing"},
    { value: "Dar Es Salaam"},
    { value: "Dasmarinas"},
    { value: "Datong"},
    { value: "Davao City"},
    { value: "Dehradun"},
    { value: "Delhi"},
    { value: "Denpasar"},
    { value: "Denver"},
    { value: "Depok"},
    { value: "Deyang"},
    { value: "Dezhou"},
    { value: "Dhaka"},
    { value: "Dhanbad"},
    { value: "Diyarbakir"},
    { value: "Dnipro"},
    { value: "Donetsk"},
    { value: "Dongguan"},
    { value: "Dongying"},
    { value: "Douala"},
    { value: "Dubai"},
    { value: "Dublin"},
    { value: "Durg Bhilainagar"},
    { value: "Dushanbe"},
    { value: "Edmonton"},
    { value: "Ekurhuleni"},
    { value: "El Paso"},
    { value: "Enugu"},
    { value: "Erbil"},
    { value: "Erduosi Ordoss"},
    { value: "Esfahan"},
    { value: "Faisalabad"},
    { value: "Fes"},
    { value: "Firozabad"},
    { value: "Florence"},
    { value: "Florianopolis"},
    { value: "Fort Worth"},
    { value: "Fortaleza"},
    { value: "Foshan"},
    { value: "Frankfurt"},
    { value: "Freetown"},
    { value: "Fukuoka"},
    { value: "Fushun Liaoning"},
    { value: "Fuxin"},
    { value: "Fuyang"},
    { value: "Fuzhou Fujian"},
    { value: "Fuzhou Jiangxi"},
    { value: "Ganzhou"},
    { value: "Gaomi"},
    { value: "Gaoxiong"},
    { value: "Gaza"},
    { value: "Gaziantep"},
    { value: "Gebze"},
    { value: "Glasgow"},
    { value: "Goiania"},
    { value: "Gold Coast"},
    { value: "Gorakhpur"},
    { value: "Goyang"},
    { value: "Grande Sao Luis"},
    { value: "Grande Vitoria"},
    { value: "Guadalajara"},
    { value: "Guangzhou"},
    { value: "Guatemala City"},
    { value: "Guayaquil"},
    { value: "Guigang"},
    { value: "Guilin"},
    { value: "Guiping"},
    { value: "Guiyang"},
    { value: "Gujranwala"},
    { value: "Guntur"},
    { value: "Guwahati"},
    { value: "Gwalior"},
    { value: "Gwangju"},
    { value: "Haicheng"},
    { value: "Haifa"},
    { value: "Haikou"},
    { value: "Hamah"},
    { value: "Hamburg"},
    { value: "Hamilton"},
    { value: "Hanchuan"},
    { value: "Hangzhou"},
    { value: "Harare"},
    { value: "Harbin"},
    { value: "Hargeysa"},
    { value: "Havana"},
    { value: "Hefei"},
    { value: "Helsinki"},
    { value: "Hengshui"},
    { value: "Hengyang"},
    { value: "Hermosillo"},
    { value: "Heze"},
    { value: "Hiroshima"},
    { value: "Ho Chi Minh City"},
    { value: "Hohhot"},
    { value: "Homs"},
    { value: "Hong Kong"},
    { value: "Houston"},
    { value: "Huaian"},
    { value: "Huaibei"},
    { value: "Huaihua"},
    { value: "Huainan"},
    { value: "Huangshi"},
    { value: "Hubli Dharwad"},
    { value: "Hufuf Mubarraz"},
    { value: "Huizhou"},
    { value: "Huludao"},
    { value: "Huzhou"},
    { value: "Hyderabad"},
    { value: "Ibadan"},
    { value: "Ikorodu"},
    { value: "Ilorin"},
    { value: "Incheon"},
    { value: "Indianapolis"},
    { value: "Ipoh"},
    { value: "Islamabad"},
    { value: "Istanbul"},
    { value: "Izmir"},
    { value: "Jabalpur"},
    { value: "Jacksonville"},
    { value: "Jaipur"},
    { value: "Jakarta"},
    { value: "Jalandhar"},
    { value: "Jammu"},
    { value: "Jamshedpur"},
    { value: "Jerusalem"},
    { value: "Jiamusi"},
    { value: "Jiangmen"},
    { value: "Jiangyin"},
    { value: "Jiaozuo"},
    { value: "Jiaxing"},
    { value: "Jiddah"},
    { value: "Jieyang"},
    { value: "Jilin"},
    { value: "Jinan"},
    { value: "Jincheng"},
    { value: "Jingzhou Hubei"},
    { value: "Jinhua"},
    { value: "Jining Shandong"},
    { value: "Jinzhou"},
    { value: "Jiujiang"},
    { value: "Jixi Heilongjiang"},
    { value: "Joao Pessoa"},
    { value: "Jodhpur"},
    { value: "Johannesburg"},
    { value: "Johor Bahru"},
    { value: "Joinville"},
    { value: "Jos"},
    { value: "Kaduna"},
    { value: "Kaifeng"},
    { value: "Kampala"},
    { value: "Kananga"},
    { value: "Kannur"},
    { value: "Kano"},
    { value: "Kanpur"},
    { value: "Karachi"},
    { value: "Karaj"},
    { value: "Kathmandu"},
    { value: "Kayamkulam"},
    { value: "Kayseri"},
    { value: "Kazan"},
    { value: "Kermanshah"},
    { value: "Kharkiv"},
    { value: "Khartoum"},
    { value: "Khulna"},
    { value: "Kigali"},
    { value: "Kinshasa"},
    { value: "Kirkuk"},
    { value: "Kisangani"},
    { value: "Kochi"},
    { value: "Kolkata"},
    { value: "Kollam"},
    { value: "Konya"},
    { value: "Kota"},
    { value: "Kottayam"},
    { value: "Kozhikode"},
    { value: "Krakow"},
    { value: "Krasnodar"},
    { value: "Krasnoyarsk"},
    { value: "Kuala Lumpur"},
    { value: "Kuerle"},
    { value: "Kumamoto"},
    { value: "Kumasi"},
    { value: "Kunming"},
    { value: "Kunshan"},
    { value: "Kuwait City"},
    { value: "La Laguna"},
    { value: "La Plata"},
    { value: "Lagos"},
    { value: "Lahore"},
    { value: "Laiwu"},
    { value: "Langfang"},
    { value: "Lanzhou"},
    { value: "Leiyang"},
    { value: "Leon De Los Aldamas"},
    { value: "Leshan"},
    { value: "Lianyungang"},
    { value: "Liaocheng"},
    { value: "Liaoyang"},
    { value: "Libreville"},
    { value: "Liling"},
    { value: "Lilongwe"},
    { value: "Lima"},
    { value: "Linfen"},
    { value: "Linhai"},
    { value: "Linyi Shandong"},
    { value: "Lisbon"},
    { value: "Liuan"},
    { value: "Liupanshui"},
    { value: "Liuyang"},
    { value: "Liuzhou"},
    { value: "Liverpool"},
    { value: "Lokoja"},
    { value: "Lome"},
    { value: "London"},
    { value: "Londrina"},
    { value: "Longyan"},
    { value: "Los Angeles"},
    { value: "Luanda"},
    { value: "Lubango"},
    { value: "Lubumbashi"},
    { value: "Lucknow"},
    { value: "Ludhiana"},
    { value: "Luohe"},
    { value: "Luoyang"},
    { value: "Lusaka"},
    { value: "Luzhou"},
    { value: "Lviv"},
    { value: "Lyon"},
    { value: "Ma Anshan"},
    { value: "Maceio"},
    { value: "Madrid"},
    { value: "Madurai"},
    { value: "Maiduguri"},
    { value: "Makassar"},
    { value: "Malang"},
    { value: "Malappuram"},
    { value: "Malegaon"},
    { value: "Managua"},
    { value: "Manaus"},
    { value: "Manchester"},
    { value: "Mandalay"},
    { value: "Mangalore"},
    { value: "Manhattan"},
    { value: "Manila"},
    { value: "Maoming"},
    { value: "Maputo"},
    { value: "Maracaibo"},
    { value: "Maracay"},
    { value: "Marrakech"},
    { value: "Marseille"},
    { value: "Mashhad"},
    { value: "Matola"},
    { value: "Maturin"},
    { value: "Mbuji Mayi"},
    { value: "Mecca"},
    { value: "Medan"},
    { value: "Medellin"},
    { value: "Medina"},
    { value: "Meerut"},
    { value: "Meishan"},
    { value: "Melbourne"},
    { value: "Mendoza"},
    { value: "Mersin"},
    { value: "Mexicali"},
    { value: "Mexico City"},
    { value: "Mianyang Sichuan"},
    { value: "Milan"},
    { value: "Minsk"},
    { value: "Misratah"},
    { value: "Mogadishu"},
    { value: "Mombasa"},
    { value: "Monrovia"},
    { value: "Monterrey"},
    { value: "Montreal"},
    { value: "Moradabad"},
    { value: "Morelia"},
    { value: "Moscow"},
    { value: "Mosul"},
    { value: "Mudanjiang"},
    { value: "Multan"},
    { value: "Mumbai"},
    { value: "Munich"},
    { value: "Muscat"},
    { value: "Muzaffarnagar"},
    { value: "Mwanza"},
    { value: "Mysore"},
    { value: "N Djamena"},
    { value: "Nagoya"},
    { value: "Nairobi"},
    { value: "Najaf"},
    { value: "Nakhon Ratchasima"},
    { value: "Nampula"},
    { value: "Nanchang"},
    { value: "Nanchong"},
    { value: "Nanning"},
    { value: "Nantong"},
    { value: "Nanyang Henan"},
    { value: "Naples"},
    { value: "Nashik"},
    { value: "Natal"},
    { value: "Nellore"},
    { value: "New York"},
    { value: "Newcastle Upon Tyne"},
    { value: "Niamey"},
    { value: "Nice"},
    { value: "Niigata"},
    { value: "Ningbo"},
    { value: "Nizhniy Novgorod"},
    { value: "Nnewi"},
    { value: "Nonthaburi"},
    { value: "Nottingham"},
    { value: "Nouakchott"},
    { value: "Novosibirsk"},
    { value: "Nyala"},
    { value: "Oaxaca De Juarez"},
    { value: "Odesa"},
    { value: "Okayama"},
    { value: "Omsk"},
    { value: "Onitsha"},
    { value: "Oran"},
    { value: "Orumiyeh"},
    { value: "Osaka"},
    { value: "Oshogbo"},
    { value: "Oslo"},
    { value: "Ottawa"},
    { value: "Ouagadougou"},
    { value: "Owerri"},
    { value: "Padang"},
    { value: "Palembang"},
    { value: "Palermo"},
    { value: "Panama City"},
    { value: "Panjin"},
    { value: "Panzhihua"},
    { value: "Paris"},
    { value: "Pathum Thani"},
    { value: "Pekan Baru"},
    { value: "Perm"},
    { value: "Perth"},
    { value: "Peshawar"},
    { value: "Philadelphia"},
    { value: "Phnom Penh"},
    { value: "Phoenix"},
    { value: "Pingdingshan Henan"},
    { value: "Pingxiang Jiangxi"},
    { value: "Pizhou"},
    { value: "Pointe Noire"},
    { value: "Port Au Prince"},
    { value: "Port Elizabeth"},
    { value: "Port Harcourt"},
    { value: "Porto"},
    { value: "Porto Alegre"},
    { value: "Prague"},
    { value: "Pretoria"},
    { value: "Puducherry"},
    { value: "Puebla"},
    { value: "Pune"},
    { value: "Puning"},
    { value: "Putian"},
    { value: "Qingdao"},
    { value: "Qingyuan"},
    { value: "Qinhuangdao"},
    { value: "Qiqihaer"},
    { value: "Qom"},
    { value: "Quanzhou"},
    { value: "Quebec City"},
    { value: "Queretaro"},
    { value: "Quetta"},
    { value: "Qujing"},
    { value: "Quzhou"},
    { value: "Rabat"},
    { value: "Raipur"},
    { value: "Rajkot"},
    { value: "Rajshahi"},
    { value: "Ranchi"},
    { value: "Rasht"},
    { value: "Rawalpindi"},
    { value: "Recife"},
    { value: "Reynosa"},
    { value: "Ribeirao Preto"},
    { value: "Rio De Janeiro"},
    { value: "Riyadh"},
    { value: "Rizhao"},
    { value: "Rome"},
    { value: "Rosario"},
    { value: "Rostov On Don"},
    { value: "Rotterdam"},
    { value: "Ruian"},
    { value: "Saharanpur"},
    { value: "Salem"},
    { value: "Saltillo"},
    { value: "Samara"},
    { value: "Samarinda"},
    { value: "Samut Prakan"},
    { value: "San Antonio"},
    { value: "San Diego"},
    { value: "San Francisco"},
    { value: "San Jose"},
    { value: "San Jose"},
    { value: "San Juan"},
    { value: "San Luis Potosi"},
    { value: "San Miguel De Tucuman"},
    { value: "San Pedro Sula"},
    { value: "San Salvador"},
    { value: "Sanaa"},
    { value: "Santa Cruz"},
    { value: "Santiago"},
    { value: "Santo Domingo"},
    { value: "Sao Jose Dos Campos"},
    { value: "Sao Paulo"},
    { value: "Sapporo"},
    { value: "Saratov"},
    { value: "Sargodha"},
    { value: "Seattle"},
    { value: "Sekondi Takoradi"},
    { value: "Semarang"},
    { value: "Sendai"},
    { value: "Seongnam"},
    { value: "Seoul"},
    { value: "Seville"},
    { value: "Shanghai"},
    { value: "Shangqiu"},
    { value: "Shangrao"},
    { value: "Shantou"},
    { value: "Shaoguan"},
    { value: "Shaoxing"},
    { value: "Shaoyang"},
    { value: "Sharjah"},
    { value: "Sheffield"},
    { value: "Shenyang"},
    { value: "Shenzhen"},
    { value: "Shijiazhuang"},
    { value: "Shimkent"},
    { value: "Shiraz"},
    { value: "Shiyan"},
    { value: "Shizuoka"},
    { value: "Sialkot"},
    { value: "Siliguri"},
    { value: "Singapore"},
    { value: "Sofia"},
    { value: "Solapur"},
    { value: "Songkhla"},
    { value: "Sorocaba"},
    { value: "Soshanguve"},
    { value: "Southampton"},
    { value: "Srinagar"},
    { value: "St Petersburg"},
    { value: "Stockholm"},
    { value: "Suining Sichuan"},
    { value: "Sulaimaniya"},
    { value: "Suqian"},
    { value: "Surabaya"},
    { value: "Surat"},
    { value: "Suweon"},
    { value: "Suzhou Anhui"},
    { value: "Suzhou Jiangsu"},
    { value: "Sydney"},
    { value: "Sylhet"},
    { value: "Tabriz"},
    { value: "Taian Shandong"},
    { value: "Tainan"},
    { value: "Taixing"},
    { value: "Taiyuan"},
    { value: "Taiyuan Shanxi"},
    { value: "Taiz"},
    { value: "Taizhong"},
    { value: "Taizhou Jiangsu"},
    { value: "Taizhou Zhejiang"},
    { value: "Tampico"},
    { value: "Tanger"},
    { value: "Tangerang"},
    { value: "Tangshan Hebei"},
    { value: "Taoyuan"},
    { value: "Tashkent"},
    { value: "Tasikmalaya"},
    { value: "Tbilisi"},
    { value: "Tegucigalpa"},
    { value: "Tehran"},
    { value: "Tel Aviv"},
    { value: "Tengzhou"},
    { value: "Teresina"},
    { value: "The Hague"},
    { value: "Thessaloniki"},
    { value: "Thiruvananthapuram"},
    { value: "Thrissur"},
    { value: "Tianjin"},
    { value: "Tianmen"},
    { value: "Tianshui"},
    { value: "Tijuana"},
    { value: "Tiruchirappalli"},
    { value: "Tiruppur"},
    { value: "Tokyo"},
    { value: "Toluca De Lerdo"},
    { value: "Tolyatti"},
    { value: "Tongliao"},
    { value: "Tongling"},
    { value: "Toronto"},
    { value: "Toulouse"},
    { value: "Tripoli"},
    { value: "Trujillo"},
    { value: "Tshikapa"},
    { value: "Tunis"},
    { value: "Tuxtla Gutierrez"},
    { value: "Tyumen"},
    { value: "Ufa"},
    { value: "Ulsan"},
    { value: "Umuahia"},
    { value: "Urumqi"},
    { value: "Uyo"},
    { value: "Valencia"},
    { value: "Valparaiso"},
    { value: "Vancouver"},
    { value: "Varanasi"},
    { value: "Veracruz"},
    { value: "Vereeniging"},
    { value: "Vienna"},
    { value: "Vijayawada"},
    { value: "Villahermosa"},
    { value: "Visakhapatnam"},
    { value: "Volgograd"},
    { value: "Voronezh"},
    { value: "Warangal"},
    { value: "Warri"},
    { value: "Warsaw"},
    { value: "Washington"},
    { value: "Weifang"},
    { value: "Weihai"},
    { value: "Wenling"},
    { value: "Wenzhou"},
    { value: "West Rand"},
    { value: "West Yorkshire"},
    { value: "Winnipeg"},
    { value: "Wuhan"},
    { value: "Wuhu Anhui"},
    { value: "Wuxi Jiangsu"},
    { value: "Wuzhou"},
    { value: "Xalapa"},
    { value: "Xiamen"},
    { value: "Xian"},
    { value: "Xiangtan Hunan"},
    { value: "Xiangyang"},
    { value: "Xianyang Shaanxi"},
    { value: "Xiaogan"},
    { value: "Xinbei"},
    { value: "Xinghua"},
    { value: "Xingtai"},
    { value: "Xining"},
    { value: "Xintai"},
    { value: "Xinxiang"},
    { value: "Xinyang"},
    { value: "Xinyu"},
    { value: "Xiongan"},
    { value: "Xuchang"},
    { value: "Xuzhou"},
    { value: "Yancheng Jiangsu"},
    { value: "Yangjiang"},
    { value: "Yangon"},
    { value: "Yangquan"},
    { value: "Yangzhou"},
    { value: "Yanji"},
    { value: "Yantai"},
    { value: "Yaounde"},
    { value: "Yekaterinburg"},
    { value: "Yibin"},
    { value: "Yichang"},
    { value: "Yichun Jiangxi"},
    { value: "Yinchuan"},
    { value: "Yingkou"},
    { value: "Yiwu"},
    { value: "Yongin"},
    { value: "Yongzhou"},
    { value: "Yueqing"},
    { value: "Yueyang"},
    { value: "Yulin Shaanxi"},
    { value: "Zamboanga City"},
    { value: "Zanzibar"},
    { value: "Zaozhuang"},
    { value: "Zaporizhzhya"},
    { value: "Zaragoza"},
    { value: "Zaria"},
    { value: "Zarqa"},
    { value: "Zhangjiakou"},
    { value: "Zhangzhou"},
    { value: "Zhanjiang"},
    { value: "Zhaoqing"},
    { value: "Zhengzhou"},
    { value: "Zhenjiang Jiangsu"},
    { value: "Zhongshan"},
    { value: "Zhucheng"},
    { value: "Zhuhai"},
    { value: "Zhuji"},
    { value: "Zhumadian"},
    { value: "Zhuzhou"},
    { value: "Zibo"},
    { value: "Zigong"},
    { value: "Zunyi"},
    { value: "Zurich"}]
const industryOptions = [{ value: "Agriculture And Allied Industries"},
    { value: "Automobiles"},
    { value: "Auto Components"},
    { value: "Aviation"},
    { value: "Banking"},
    { value: "Cement"},
    { value: "Consumer Durables"},
    { value: "Ecommerce"},
    { value: "Education And Training"},
    { value: "Engineering And Capital Goods"},
    { value: "Financial Services"},
    { value: "FMCG"},
    { value: "Gems And Jewellery"},
    { value: "Healthcare"},
    { value: "Infrastructure"},
    { value: "Insurance"},
    { value: "Information Technology"},
    { value: "Manufacturing"},
    { value: "Media And Entertainment"},
    { value: "Metals And Mining"},
    { value: "Oil And Gas"},
    { value: "Pharmaceuticals"},
    { value: "Ports"},
    { value: "Power"},
    { value: "Railways"},
    { value: "Real Estate"},
    { value: "Renewable Energy"},
    { value: "Retail"},
    { value: "Roads"},
    { value: "Science And Technology"},
    { value: "Services"},
    { value: "Steel"},
    { value: "Telecommunications"},
    { value: "Textiles"},
    { value: "Tourism And Hospitality"}]
class Contribute extends Component {

    constructor(props){
        super(props);
        this.state ={
            componentSize:'large',
            "companyName":"",
            "salaryCut": "",
            "hiringStatus": "",
            "industry": "",
            "city": "",
            "workCulture":"",
            "createTs": new Date().getTime(),
            "website": "",
            "campusHiring": "",
            "hiringLink": ""
        }
    }
    componentDidMount() {

    }
    submit(){
        let body = {
            "companyName": this.state.companyName,
            "salaryCut": this.state.salaryCut,
            "hiringStatus": this.state.hiringStatus,
            "industry": this.state.industry,
            "city": this.state.city,
            "workCulture": this.state.workCulture,
            "createTs": new Date().getTime(),
            "website": "",
            "campusHiring": "",
            "hiringLink": this.state.hiringLink
        }
        if(!body.companyName || !body.hiringStatus || !body.salaryCut || !body.industry || !body.city || !body.workCulture){
            alert("Please answer all mandatory questions.")
        }
        else{
            this.props.addCompany(body)
        }

    }
    render() {
        let { companies } = this.props;

        return (
            <div>
                <div className="navigation">
                    <div className={"container"}>
                        <div className="navigationLeft">
                            <Link to={"/"}> <div className="navigationLogo">
                                Covid-19 Job Tracker
                            </div>
                            </Link>
                        </div>
                        <div className="navigationRight">
                            <Link to={"/"}>
                            <div className={"navigationLiveButton"}>LIVE</div>
                            <div className={"contributeButton freeze"}>
                               Hiring Freeze / Layoffs Tracker
                            </div>
                            </Link>
                        </div>
                    </div>
                </div>
                {companies.loading && <Loader/>}
                {!companies.loading && <div className="container" style={{marginTop:'5rem'}}>
                    <div className={"formHead"}>Contribute to COVID-19 Salary Cuts and Hiring Freezes Tracker</div>
                    <div className={"contributionForm"}>

                        <Form
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 14 }}
                            layout="vertical"
                            // initialValues={{ size: this.state.componentSize }}
                            size={this.state.componentSize}
                        >

                            <Form.Item label="Company Name">
                                <Input autoSize={true} style={{ width: '100%' }}
                                       onChange={(text) => this.setState({companyName:text.target.value}) }/>
                            </Form.Item>
                            <Form.Item label="Select Location">
                                <AutoComplete
                                    style={{ width: '100%' }}
                                    options={locationOptions}
                                    placeholder="enter location.."
                                    filterOption={(inputValue, option) =>
                                        option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                    }
                                    onSelect={(city) => this.setState({city:city})}
                                />
                            </Form.Item>
                            <Form.Item label="Select industry">
                                <AutoComplete
                                    style={{ width: '100%' }}
                                    options={industryOptions}
                                    placeholder="enter industry name"
                                    filterOption={(inputValue, option) =>
                                        option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                    }
                                    onSelect={(industry) => this.setState({industry:industry})}
                                />
                            </Form.Item>
                            <Form.Item label="Hiring Status" name="hiringStatus">
                                <Radio.Group onChange={(text) => this.setState({hiringStatus:text.target.value})}>
                                    <Radio.Button value="Hiring">Hiring</Radio.Button>
                                    <Radio.Button value="Hiring Freeze">Hiring Freeze</Radio.Button>
                                    <Radio.Button value="Layoffs">Layoffs</Radio.Button>
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item label="Salary cuts?" name="salaryCut">
                                <Radio.Group onChange={(text) => this.setState({salaryCut:text.target.value})}>
                                    <Radio.Button value="Yes">Yes</Radio.Button>
                                    <Radio.Button value="No">No</Radio.Button>
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item label="Work Culture" name="workCulture">
                                <Radio.Group onChange={(text) => this.setState({workCulture:text.target.value})} >
                                    <Radio.Button value="Stressful">Stressful</Radio.Button>
                                    <Radio.Button value="Moderate">Moderate</Radio.Button>
                                    <Radio.Button value="Awesome">Awesome</Radio.Button>
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item label="Where to apply?">
                                <Input  autoSize={true} style={{ width: '100%' }} onChange={(text) => this.setState({hiringLink:text.target.value}) }/>
                            </Form.Item>
                            <Form.Item label="">
                                <Button style={{color: '#fff',
    backgroundColor:'#1890ff',
    borderColor: '#1890ff',
    textShadow: '0 -1px 0 rgba(0, 0, 0, 0.12)',
    boxShadow: '0 2px 0 rgba(0, 0, 0, 0.045)'}} onClick={()=>this.submit()}>Submit</Button>
                            </Form.Item>

                        </Form>
                    </div>
                </div>}
            </div>
        );
    }
}

Contribute.propTypes = {
    addCompany:PropTypes.func.isRequired,
    companies:PropTypes.object.isRequired
}

const mapStateToProps = state  => ({
    companies:state.companies
})

export default connect(mapStateToProps, {addCompany})(withRouter(Contribute))

