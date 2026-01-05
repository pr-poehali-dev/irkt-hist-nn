import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [selectedRoute, setSelectedRoute] = useState<number | null>(null);

  const historicalEvents = [
    { year: 1661, event: 'Основание Иркутского острога', description: 'Яков Похабов заложил острог на берегу Ангары' },
    { year: 1686, event: 'Получение статуса города', description: 'Иркутск официально признан городом' },
    { year: 1825, event: 'Прибытие декабристов', description: 'Город стал местом ссылки участников восстания' },
    { year: 1898, event: 'Прокладка Транссиба', description: 'Транссибирская магистраль связала Иркутск с Россией' },
    { year: 1950, event: 'Строительство ГЭС', description: 'Начало строительства Иркутской ГЭС' },
  ];

  const landmarks = [
    {
      id: 1,
      name: 'Крестовоздвиженская церковь',
      year: '1747',
      description: 'Единственный памятник каменного церковного зодчества XVII века',
      category: 'Религиозная архитектура',
      image: 'https://cdn.poehali.dev/projects/724acf2d-901f-4b2d-ab6a-af44a991d527/files/ad8475c7-baf2-4738-92b5-7381db769d3b.jpg'
    },
    {
      id: 2,
      name: 'Дом-музей Волконских',
      year: '1838',
      description: 'Музей декабристов в историческом особняке',
      category: 'Музей',
      image: 'https://cdn.poehali.dev/projects/724acf2d-901f-4b2d-ab6a-af44a991d527/files/8656eb21-f356-4001-96f3-53c5ca9609fb.jpg'
    },
    {
      id: 3,
      name: '130-й квартал',
      year: '2011',
      description: 'Исторический квартал с воссозданной архитектурой XIX века',
      category: 'Городская среда',
      image: 'https://cdn.poehali.dev/projects/724acf2d-901f-4b2d-ab6a-af44a991d527/files/ad8475c7-baf2-4738-92b5-7381db769d3b.jpg'
    },
    {
      id: 4,
      name: 'Спасская церковь',
      year: '1706',
      description: 'Старейшее каменное здание Иркутска с богатым декором',
      category: 'Религиозная архитектура',
      image: 'https://cdn.poehali.dev/projects/724acf2d-901f-4b2d-ab6a-af44a991d527/files/ad8475c7-baf2-4738-92b5-7381db769d3b.jpg'
    },
    {
      id: 5,
      name: 'Знаменский монастырь',
      year: '1689',
      description: 'Женский монастырь с некрополем известных иркутян',
      category: 'Религиозная архитектура',
      image: 'https://cdn.poehali.dev/projects/724acf2d-901f-4b2d-ab6a-af44a991d527/files/ad8475c7-baf2-4738-92b5-7381db769d3b.jpg'
    },
    {
      id: 6,
      name: 'Московские ворота',
      year: '1811',
      description: 'Триумфальная арка в честь 10-летия правления Александра I',
      category: 'Памятник',
      image: 'https://cdn.poehali.dev/projects/724acf2d-901f-4b2d-ab6a-af44a991d527/files/ad8475c7-baf2-4738-92b5-7381db769d3b.jpg'
    }
  ];

  const routes = [
    {
      id: 1,
      name: 'Купеческий Иркутск',
      duration: '3 часа',
      distance: '4 км',
      points: ['130-й квартал', 'Особняк Файнберга', 'Дом Шастина', 'Кружевной дом'],
      description: 'Погружение в атмосферу купеческого города XIX века'
    },
    {
      id: 2,
      name: 'По следам декабристов',
      duration: '2.5 часа',
      distance: '3 км',
      points: ['Дом Волконских', 'Дом Трубецких', 'Знаменский монастырь'],
      description: 'История декабристов в сибирской ссылке'
    },
    {
      id: 3,
      name: 'Православные святыни',
      duration: '4 часа',
      distance: '5 км',
      points: ['Спасская церковь', 'Богоявленский собор', 'Знаменский монастырь', 'Крестовоздвиженская церковь'],
      description: 'Духовное наследие старого Иркутска'
    },
    {
      id: 4,
      name: 'Деревянное зодчество',
      duration: '2 часа',
      distance: '2.5 км',
      points: ['Дом Европы', 'Кружевной дом', 'Усадьба Сукачёва'],
      description: 'Уникальные образцы сибирского деревянного зодчества'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <Icon name="Landmark" className="text-primary-foreground" size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Иркутск</h1>
                <p className="text-sm text-muted-foreground">Культурное наследие Сибири</p>
              </div>
            </div>
            <nav className="hidden md:flex gap-6">
              <a href="#history" className="text-foreground hover:text-primary transition-colors">История</a>
              <a href="#landmarks" className="text-foreground hover:text-primary transition-colors">Достопримечательности</a>
              <a href="#routes" className="text-foreground hover:text-primary transition-colors">Маршруты</a>
              <a href="#gallery" className="text-foreground hover:text-primary transition-colors">Галерея</a>
            </nav>
          </div>
        </div>
      </header>

      <section className="relative py-24 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: 'url(https://cdn.poehali.dev/projects/724acf2d-901f-4b2d-ab6a-af44a991d527/files/ad8475c7-baf2-4738-92b5-7381db769d3b.jpg)' }}
        />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center fade-in">
            <div className="inline-block mb-6 ornament-border pb-4">
              <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-2">Ворота в Сибирь</h2>
            </div>
            <p className="text-xl text-muted-foreground mb-8">
              Откройте для себя 365 лет истории, архитектурных шедевров и культурных традиций старинного сибирского города
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button size="lg" className="gap-2">
                <Icon name="MapPin" size={20} />
                Начать экскурсию
              </Button>
              <Button size="lg" variant="outline" className="gap-2">
                <Icon name="Image" size={20} />
                Смотреть галерею
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent" />
      </section>

      <section id="history" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">Вехи истории</h2>
            <p className="text-lg text-muted-foreground">От острога до столицы Восточной Сибири</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute left-[50%] top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-secondary to-accent" />
              
              {historicalEvents.map((item, index) => (
                <div key={index} className={`relative mb-8 ${index % 2 === 0 ? 'text-right pr-[52%]' : 'text-left pl-[52%]'}`}>
                  <div className="fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                    <Card className="inline-block hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-center gap-2 justify-between">
                          <CardTitle className="text-2xl">{item.year}</CardTitle>
                          <Badge variant="outline" className="bg-primary/10">{item.event}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">{item.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                  <div className={`absolute top-6 ${index % 2 === 0 ? 'right-[calc(50%-12px)]' : 'left-[calc(50%-12px)]'} w-6 h-6 rounded-full bg-primary border-4 border-background`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="landmarks" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">Достопримечательности</h2>
            <p className="text-lg text-muted-foreground">Архитектурные жемчужины Иркутска</p>
          </div>

          <Tabs defaultValue="all" className="mb-8">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-4">
              <TabsTrigger value="all">Все</TabsTrigger>
              <TabsTrigger value="church">Храмы</TabsTrigger>
              <TabsTrigger value="museum">Музеи</TabsTrigger>
              <TabsTrigger value="urban">Городская</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {landmarks.map((landmark) => (
                <Card key={landmark.id} className="overflow-hidden hover:shadow-xl transition-shadow group">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={landmark.image} 
                      alt={landmark.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-secondary">{landmark.year}</Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl">{landmark.name}</CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <Icon name="Tag" size={14} />
                      {landmark.category}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{landmark.description}</p>
                    <Button variant="outline" size="sm" className="w-full gap-2">
                      <Icon name="Info" size={16} />
                      Подробнее
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="church" className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {landmarks.filter(l => l.category === 'Религиозная архитектура').map((landmark) => (
                <Card key={landmark.id} className="overflow-hidden hover:shadow-xl transition-shadow group">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={landmark.image} 
                      alt={landmark.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-secondary">{landmark.year}</Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl">{landmark.name}</CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <Icon name="Tag" size={14} />
                      {landmark.category}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{landmark.description}</p>
                    <Button variant="outline" size="sm" className="w-full gap-2">
                      <Icon name="Info" size={16} />
                      Подробнее
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="museum" className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {landmarks.filter(l => l.category === 'Музей').map((landmark) => (
                <Card key={landmark.id} className="overflow-hidden hover:shadow-xl transition-shadow group">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={landmark.image} 
                      alt={landmark.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-secondary">{landmark.year}</Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl">{landmark.name}</CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <Icon name="Tag" size={14} />
                      {landmark.category}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{landmark.description}</p>
                    <Button variant="outline" size="sm" className="w-full gap-2">
                      <Icon name="Info" size={16} />
                      Подробнее
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="urban" className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {landmarks.filter(l => l.category === 'Городская среда' || l.category === 'Памятник').map((landmark) => (
                <Card key={landmark.id} className="overflow-hidden hover:shadow-xl transition-shadow group">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={landmark.image} 
                      alt={landmark.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-secondary">{landmark.year}</Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl">{landmark.name}</CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <Icon name="Tag" size={14} />
                      {landmark.category}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{landmark.description}</p>
                    <Button variant="outline" size="sm" className="w-full gap-2">
                      <Icon name="Info" size={16} />
                      Подробнее
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <section id="routes" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">Туристические маршруты</h2>
            <p className="text-lg text-muted-foreground">Тематические экскурсии по историческому центру</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {routes.map((route) => (
              <Card 
                key={route.id} 
                className={`hover:shadow-xl transition-all cursor-pointer ${selectedRoute === route.id ? 'ring-2 ring-primary' : ''}`}
                onClick={() => setSelectedRoute(route.id)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-2xl mb-2">{route.name}</CardTitle>
                      <CardDescription className="text-base">{route.description}</CardDescription>
                    </div>
                    <Icon name="Route" className="text-primary" size={28} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4 mb-4">
                    <Badge variant="secondary" className="gap-1">
                      <Icon name="Clock" size={14} />
                      {route.duration}
                    </Badge>
                    <Badge variant="secondary" className="gap-1">
                      <Icon name="Map" size={14} />
                      {route.distance}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-foreground">Точки маршрута:</p>
                    <ul className="space-y-1">
                      {route.points.map((point, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold">
                            {idx + 1}
                          </div>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button className="w-full mt-4 gap-2" variant={selectedRoute === route.id ? "default" : "outline"}>
                    <Icon name="Navigation" size={16} />
                    {selectedRoute === route.id ? 'Маршрут выбран' : 'Выбрать маршрут'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="gallery" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">Фотогалерея</h2>
            <p className="text-lg text-muted-foreground">Исторические и современные виды Иркутска</p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="md:col-span-2 relative h-96 rounded-lg overflow-hidden group cursor-pointer">
              <img 
                src="https://cdn.poehali.dev/projects/724acf2d-901f-4b2d-ab6a-af44a991d527/files/ad8475c7-baf2-4738-92b5-7381db769d3b.jpg" 
                alt="Иркутск"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                <div>
                  <h3 className="text-white font-bold text-xl mb-1">Исторический центр</h3>
                  <p className="text-white/80">Вид на Ангару</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="relative h-44 rounded-lg overflow-hidden group cursor-pointer">
                <img 
                  src="https://cdn.poehali.dev/projects/724acf2d-901f-4b2d-ab6a-af44a991d527/files/8656eb21-f356-4001-96f3-53c5ca9609fb.jpg" 
                  alt="Музей декабристов"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <p className="text-white font-semibold">Музей декабристов</p>
                </div>
              </div>

              <div className="relative h-44 rounded-lg overflow-hidden group cursor-pointer">
                <img 
                  src="https://cdn.poehali.dev/projects/724acf2d-901f-4b2d-ab6a-af44a991d527/files/e32193a0-5e82-4445-b82c-0bd211fb2368.jpg" 
                  alt="Бурятские орнаменты"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <p className="text-white font-semibold">Традиционные орнаменты</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <Button size="lg" variant="outline" className="gap-2">
              <Icon name="ImagePlus" size={20} />
              Смотреть всю галерею
            </Button>
          </div>
        </div>
      </section>

      <footer className="bg-primary text-primary-foreground py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Культурный портал Иркутска</h3>
              <p className="opacity-90">Исследуйте богатую историю и культурное наследие сибирского города</p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Навигация</h4>
              <ul className="space-y-2 opacity-90">
                <li><a href="#history" className="hover:underline">История</a></li>
                <li><a href="#landmarks" className="hover:underline">Достопримечательности</a></li>
                <li><a href="#routes" className="hover:underline">Маршруты</a></li>
                <li><a href="#gallery" className="hover:underline">Галерея</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Контакты</h4>
              <div className="space-y-2 opacity-90">
                <p className="flex items-center gap-2">
                  <Icon name="Mail" size={16} />
                  info@irkutsk-heritage.ru
                </p>
                <p className="flex items-center gap-2">
                  <Icon name="Phone" size={16} />
                  +7 (3952) 000-000
                </p>
              </div>
            </div>
          </div>
          <div className="border-t border-primary-foreground/20 pt-6 text-center opacity-75">
            <p>&copy; 2026 Культурный портал Иркутска. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
