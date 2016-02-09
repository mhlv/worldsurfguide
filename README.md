Фильтры НЕ работают!

ТуДу фичи:
геолокация + отъезд на мировой масштаб если спотов поблизости нет;
всплывашки на кластерах и маркерах с краткой инфо + попапы (?) с подробностями по клику;
карта с апрувленными спотами (для всех), с апрувленными и неапрувленными спотами и интерфейсом добавления спотов (для админов и редакторов);

ТуДу по серверной части:
стянуть базу спотов вот отсюда: wannasurf.com
натравить на эту базу редакторов;
Профит!

ТуДу по структуре:
добавить искусственные волны;
решить, что делать с пиками;

Описание API:
getSpots(queryStrung) | post | - поисковой запрос, возвращает json со спотами, подходящими условиям запроса;
createSpot(spotItem) | post | - добавляет спот; spotItem - json;
updateSpot(spotItem) | post | редактирование спота
deleteSpot(id) | post


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
surfer level | collection (rookie, intermediate, pro etc.)
big wave spot | boolean
infrastructure | array
coordinates | lat + lon
sharks rate | int
Text coords | str

параметры пика (peaks):
avg.  size | int
wave direction | string (left, right, a-frame)
wave char. | string (steep, mellow, etc.)
bottom char. | string (reef, sand, rocks, etc.)
suitable boards | collection

параметры инфраструктуры (bool):
shower
toilet
food/drinks
lifeguard / water patrol
board rental
surf school
additional | string

параметры фильтров:
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