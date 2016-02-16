ТуДу по дизайну:
* минимальная айдентика (лого);
* маркеры в зависимости от типа волны, например;
* кластеры (в зависимости от типов маркеров внутри + кол-во);
* всплывашки на маркерах с краткой информацией;
* поп-апы с полной информацией по споту;
* edit mode предыдущего пункта (форма для редактирования/добавления спота);
  
  
ТуДу по серверной части:  
Итак, на первом этапе с wannasurf.com нужно забрать следующее:  
* все споты с gps-координатами, их там должно быть 5816, но счетчик может и врать;
* координаты взять только последние (на некоторых спотах есть их история), в базу положить в формате \[lat, lng\] / \[38.988218,-9.421071\];
* Название спота;
* раздел ACCESS на странице спота пропускаем;
* параметр Experience (раздел SURF SPOT QUALITY на странице спота) в базу кладем по схеме:  
All surfers - 0  
Beginners wave - 1  
Experienced surfers - 2  
Pros or kamikaze only... - 3  
Это идет в поле surfer level;  
* В поле wave direction:  
Right and left - 0  
Right - 1  
Left - 2;  
* из подраздела WAVE нужно взять все возможные значения параметров type, bottom, power; сделать для них карту, аналогичную двум предыдущим пунктам и положить в поля wave char., bottom char., wave power соответственно; возможно перечисление, так что кладем в виде массива.
* из подраздела DANGERS - то же самое, дефисы перед пунктами, само собой, не нужны;
* additional information, если есть, кидаем в spot description. На странице спота у этой информации есть подразделы, на них забиваем, просто разделяем двойным брейком (\<br /\>\<br /\>);
* в keywords кладем хлебные крошки начиная со второго уровня (континент) в виде массива. AUSTRALIA & PACIFIC разбиваем на два киворда, к америкам добавляем просто america (\["central america", "america"\])

ТуДу по структуре:  
добавить искусственные волны;  
решить, что делать с пиками;  

Описание API:  
* searchSpots(queryString) | post | - поисковой запрос, возвращает  array со спотами, подходящими условиям запроса; в объекте спота должны быть id, name, coords;  
на счет формата запроса не уверен. Мне было бы удобно постить json с параметрами, типа  
searchSpots({"surfer_level":\[0,1\], "wave_direction":0})  
Но могу и queryString передавать обычный surfer_level=0,1&wave_direction=0  
так что это на твое усмотрение.  
* getSpot(id) | post | возвращает объект со всеми параметрами спотов
* createSpot(spotItem) | post | - добавляет спот; spotItem - json;  
* updateSpot(spotItem) | post | редактирование спота  
* deleteSpot(id) | post  
* getLength | get | возвращает общее кол-во спотов в базе  
* опционально, но желательно: searchSpotsAround(coords, r) | post | возвращает споты с координатами в радиусе r от точки coords


Примерная структура (требует обновления):  

параметры спота:  
id | int  
approved | boolean - параметр для вывода спота на пуюличную карту  
name | str  
suitable swell size | from: int, to: int  
best season (month - month) | from: int, to: int  
best tide | string (f.e. mid-low, all-tide)  
avg temp. summer | int  
avg temp. winter | int  
suitable outfit | string (ws3, ws4, boardshorts, etc)  
peaks | int  
spot description | string  
surfer level | int
wave direction | array  
wave char. | array 
wave power | array
bottom char. | int
suitable boards | array  
big wave spot | boolean  
infrastructure | array  
coordinates | lat + lon  
dangers | array
sharks rate | int  
keywords | str  


параметры инфраструктуры (bool) *(пока пропускаем)*:  
shower  
toilet  
food/drinks  
lifeguard / water patrol  
board rental  
surf school  
additional | string  

параметры фильтров: *на странице уже более актуальные*  
wave size | range  
season | range  
surfer level | range  
suit. outfit | checkbox collection  
suit. boards | checkbox collection  
wave direction | checkbox collection  
wave char. | checkbox collection  
bottom char. | checkbox collection  
infrastructure | checkbox collection  
big wave | checkbox  
no sharks | checkbox  
  
  
ТуДу фичи:  
геолокация + отъезд на мировой масштаб если спотов поблизости нет;  
всплывашки на кластерах и маркерах с краткой инфо + попапы (?) с подробностями по клику;  
карта с апрувленными спотами (для всех), с апрувленными и неапрувленными спотами и интерфейсом добавления спотов (для админов и редакторов);  
  