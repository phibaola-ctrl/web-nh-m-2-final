export interface Tour {
  id: string;
  name: string;
  location: string;
  country: string;
  description: string;
  price: number;
  duration: string;
  rating: number;
  images: string[];
  category: 'Nature' | 'City' | 'Beach' | 'Adventure' | 'Cultural';
  features: string[];
  coordinates: { lat: number; lng: number };
  itinerary: { day: number; title: string; desc: string }[];
  video?: string;
  feedback: { user: string; comment: string; rating: number }[];
}

export const TOURS: Tour[] = [
  {
    id: '1',
    name: 'Vịnh Hạ Long Kỳ Ảo',
    location: 'Hạ Long',
    country: 'Việt Nam',
    description: 'Khám phá di sản thiên nhiên thế giới với hàng ngàn hòn đảo đá vôi kỳ vĩ và làn nước xanh lục bảo.',
    price: 3500000,
    duration: '3 Ngày 2 Đêm',
    rating: 4.9,
    category: 'Nature',
    coordinates: { lat: 20.9500, lng: 107.0833 },
    images: [
      'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1552074284-5e88ef1aef18?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1200'
    ],
    features: ['Chèo thuyền Kayak', 'Tham quan hang động', 'Tiệc tối trên du thuyền'],
    itinerary: [
      { day: 1, title: 'Đón khách & Lên tàu', desc: 'Nhận phòng du thuyền, dùng bữa trưa và ngắm cảnh vịnh.' },
      { day: 2, title: 'Hang Sửng Sốt & Đảo Titop', desc: 'Leo núi ngắm toàn cảnh hoặc tắm biển tại bãi cát trắng.' },
      { day: 3, title: 'Làng chài & Trở về', desc: 'Tham quan làng chài ven biển và check-out.' }
    ],
    feedback: [
      { user: 'Nguyễn Văn A', comment: 'Chuyến đi tuyệt vời, cảnh đẹp mê hồn!', rating: 5 },
      { user: 'Trần Thị B', comment: 'Dịch vụ du thuyền rất tốt.', rating: 4 }
    ]
  },
  {
    id: '2',
    name: 'Kyoto - Thu Vàng Cổ Kính',
    location: 'Kyoto',
    country: 'Nhật Bản',
    description: 'Trải nghiệm vẻ đẹp bình yên của những ngôi đền cổ và rừng tre Sagano trong sắc thu rực rỡ.',
    price: 25000000,
    duration: '5 Ngày 4 Đêm',
    rating: 4.8,
    category: 'Cultural',
    coordinates: { lat: 35.0116, lng: 135.7681 },
    images: [
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&q=80&w=1200'
    ],
    features: ['Mặc Kimono', 'Trà đạo', 'Thưởng thức ẩm thực Kaiseki'],
    itinerary: [
      { day: 1, title: 'Đến Kyoto', desc: 'Nhận phòng và dạo phố Gion.' },
      { day: 2, title: 'Đền Thanh Thủy', desc: 'Ngắm nhìn toàn cảnh Kyoto từ ban công gỗ huyền thoại.' },
      { day: 3, title: 'Rừng tre Arashiyama', desc: 'Đi dạo trong con đường tre xanh mát.' }
    ],
    feedback: [
      { user: 'Sato M.', comment: 'Beautiful autumn leaves!', rating: 5 }
    ]
  },
  {
    id: '3',
    name: 'Thụy Sĩ - Ngôi Làng Trên Mây',
    location: 'Interlaken',
    country: 'Thụy Sĩ',
    description: 'Tận hưởng không khí trong lành tại dãy Alps hùng vĩ và những hồ nước xanh ngắt như ngọc.',
    price: 65000000,
    duration: '7 Ngày 6 Đêm',
    rating: 5.0,
    category: 'Adventure',
    coordinates: { lat: 46.6863, lng: 7.8632 },
    images: [
      'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1527668752968-14dc70a27c95?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=1200'
    ],
    features: ['Trượt tuyết', 'Đi tàu hỏa leo núi', 'Dùng fondue phô mai'],
    itinerary: [
      { day: 1, title: 'Zurich đến Interlaken', desc: 'Hành trình tàu hỏa qua những hồ nước tuyệt đẹp.' },
      { day: 2, title: 'Đỉnh Jungfraujoch', desc: 'Chinh phục "Nóc nhà Châu Âu".' }
    ],
    feedback: [
      { user: 'Hoàng Minh', comment: 'Chuyến đi Interlaken tuyệt đẹp, núi tuyết rất hùng vĩ.', rating: 5 },
      { user: 'Thùy Chi', comment: 'Đồ ăn fondue phô mai hơi béo nhưng rất đặc biệt.', rating: 4 }
    ]
  },
  {
    id: '4',
    name: 'Bali - Thiên Đường Nghỉ Dưỡng',
    location: 'Ubud',
    country: 'Indonesia',
    description: 'Thả mình vào thiên nhiên với những ruộng bậc thang xanh mướt và những bãi biển bình yên.',
    price: 12000000,
    duration: '4 Ngày 3 Đêm',
    rating: 4.7,
    category: 'Beach',
    coordinates: { lat: -8.5069, lng: 115.2625 },
    images: [
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1559628233-e02027d1433f?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=1200'
    ],
    features: ['Yoga sáng sớm', 'Tắm bùn khoáng', 'Ngắm hoàng hôn trên biển'],
    itinerary: [
      { day: 1, title: 'Khám phá Ubud', desc: 'Thăm rừng khỉ và chợ nghệ thuật.' }
    ],
    feedback: [
      { user: 'Linh Đan', comment: 'Ubud rất yên bình, resort tuyệt vời.', rating: 5 }
    ]
  },
  {
    id: '5',
    name: 'Paris - Kinh Đô Ánh Sáng',
    location: 'Paris',
    country: 'Pháp',
    description: 'Lang thang dưới tháp Eiffel, tham quan bảo tàng Louvre và thưởng thức bánh Croissant nóng hổi.',
    price: 45000000,
    duration: '6 Ngày 5 Đêm',
    rating: 4.6,
    category: 'City',
    coordinates: { lat: 48.8566, lng: 2.3522 },
    images: [
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&q=80&w=1200'
    ],
    features: ['Du thuyền trên sông Seine', 'Thăm bảo tàng Louvre', 'Mua sắm thời trang'],
    itinerary: [
      { day: 1, title: 'Tháp Eiffel', desc: 'Ngắm nhìn toàn cảnh Paris từ trên cao.' }
    ],
    feedback: [
      { user: 'Quốc Bảo', comment: 'Paris hoa lệ nhưng chi phí hơi cao.', rating: 4 }
    ]
  },
  {
    id: '6',
    name: 'Santorini - Sắc Xanh Địa Trung Hải',
    location: 'Oia',
    country: 'Hy Lạp',
    description: 'Ngắm hoàng hôn đẹp nhất thế giới trên những ngôi nhà vách đá màu trắng xanh đặc trưng.',
    price: 55000000,
    duration: '5 Ngày 4 Đêm',
    rating: 4.9,
    category: 'Beach',
    coordinates: { lat: 36.4618, lng: 25.3753 },
    images: [
      'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1469796466635-455ede028ec2?auto=format&fit=crop&q=80&w=1200'
    ],
    features: ['Ngắm hoàng hôn Oia', 'Tắm biển đen Perissa', 'Ăn hải sản tươi'],
    itinerary: [],
    feedback: []
  },
  {
    id: '7',
    name: 'Dubai - Thành Phố Tương Lai',
    location: 'Dubai',
    country: 'UAE',
    description: 'Trải nghiệm sự xa hoa tột bậc với những tòa nhà chọc trời và sa mạc Safari huyền bí.',
    price: 35000000,
    duration: '5 Ngày 4 Đêm',
    rating: 4.8,
    category: 'Adventure',
    coordinates: { lat: 25.2048, lng: 55.2708 },
    images: [
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3?auto=format&fit=crop&q=80&w=1200'
    ],
    features: ['Safari sa mạc', 'Lên đỉnh Burj Khalifa', 'Trượt tuyết trong nhà'],
    itinerary: [],
    feedback: []
  },
  {
    id: '8',
    name: 'Cappadocia - Thành Phố Khinh Khí Cầu',
    location: 'Cappadocia',
    country: 'Thổ Nhĩ Kỳ',
    description: 'Bay giữa hàng trăm khinh khí cầu rực rỡ sắc màu và khám phá thành phố dưới lòng đất.',
    price: 30000000,
    duration: '4 Ngày 3 Đêm',
    rating: 4.9,
    category: 'Adventure',
    coordinates: { lat: 38.6418, lng: 34.8533 },
    images: [
      'https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1527838832702-585f23df5bb2?auto=format&fit=crop&q=80&w=1200'
    ],
    features: ['Bay khinh khí cầu', 'Ở khách sạn hang động', 'Thăm bảo tàng Goreme'],
    itinerary: [],
    feedback: []
  },
  {
    id: '9',
    name: 'Rome - Bảo Tàng Sống',
    location: 'Rome',
    country: 'Ý',
    description: 'Quay ngược thời gian với đấu trường La Mã hùng vĩ và những quảng trường lãng mạn.',
    price: 40000000,
    duration: '6 Ngày 5 Đêm',
    rating: 4.7,
    category: 'Cultural',
    coordinates: { lat: 41.9028, lng: 12.4964 },
    images: [
      'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1529260830199-42c24126f198?auto=format&fit=crop&q=80&w=1200'
    ],
    features: ['Thăm Đấu trường La Mã', 'Ném xu hồ Trevi', 'Ăn Pasta chuẩn Ý'],
    itinerary: [],
    feedback: []
  },
  {
    id: '10',
    name: 'New York - Thành Phố Không Ngủ',
    location: 'New York',
    country: 'Mỹ',
    description: 'Trải nghiệm nhịp sống sôi động tại Manhattan, dạo bước công viên Trung Tâm và xem kịch Broadway.',
    price: 70000000,
    duration: '7 Ngày 6 Đêm',
    rating: 4.5,
    category: 'City',
    coordinates: { lat: 40.7128, lng: -74.0060 },
    images: [
      'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?auto=format&fit=crop&q=80&w=1200'
    ],
    features: ['Tượng Nữ thần Tự do', 'Dạo Central Park', 'Quảng trường Thời đại'],
    itinerary: [],
    feedback: []
  },
  {
    id: '12',
    name: 'Đà Lạt - Thành Phố Ngàn Hoa',
    location: 'Lâm Đồng',
    country: 'Việt Nam',
    description: 'Tận hưởng khí hậu ôn hòa và vẻ đẹp thơ mộng của những đồi thông reo.',
    price: 4800000,
    duration: '3 Ngày 2 Đêm',
    rating: 4.7,
    category: 'Nature',
    coordinates: { lat: 11.9404, lng: 108.4583 },
    images: [
      'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&q=80&w=1200'
    ],
    features: ['Thung lũng Tình Yêu', 'Hồ Tuyền Lâm', 'Chợ đêm Đà Lạt'],
    itinerary: [],
    feedback: []
  },
  {
    id: '13',
    name: 'Phú Quốc - Đảo Ngọc Tình Yêu',
    location: 'Phú Quốc',
    country: 'Việt Nam',
    description: 'Đắm mình trong làn nước biển trong vắt và ngắm hoàng hôn tuyệt đẹp tại Bãi Trường.',
    price: 13500000,
    duration: '4 Ngày 3 Đêm',
    rating: 4.8,
    category: 'Beach',
    coordinates: { lat: 10.2899, lng: 103.9840 },
    images: [
      'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?auto=format&fit=crop&q=80&w=1200'
    ],
    features: ['Grand World', 'Cáp treo Hòn Thơm', 'Lặn ngắm san hô'],
    itinerary: [],
    feedback: []
  },
  {
    id: '15',
    name: 'Seoul - Sắc Màu Hàn Quốc',
    location: 'Seoul',
    country: 'Hàn Quốc',
    description: 'Trải nghiệm không gian k-pop sôi động và những cung điện cổ kính nghìn năm.',
    price: 26800000,
    duration: '5 Ngày 4 Đêm',
    rating: 4.9,
    category: 'Cultural',
    coordinates: { lat: 37.5665, lng: 126.9780 },
    images: [
      'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&q=80&w=1200'
    ],
    features: ['Cung điện Gyeongbokgung', 'Tháp Namsan', 'Mặc Hanbok'],
    itinerary: [],
    feedback: []
  },
  {
    id: '16',
    name: 'Iceland - Vũ Điệu Ánh Sáng',
    location: 'Reykjavik',
    country: 'Iceland',
    description: 'Chiêm ngưỡng hiện tượng cực quang kỳ ảo và tắm suối khoáng nóng Blue Lagoon giữa lòng băng tuyết.',
    price: 85000000,
    duration: '6 Ngày 5 Đêm',
    rating: 4.9,
    category: 'Nature',
    coordinates: { lat: 64.1466, lng: -21.9426 },
    images: [
      'https://images.unsplash.com/photo-1476610182048-b716b8518aae?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1521033332975-fc7700683075?auto=format&fit=crop&q=80&w=1200'
    ],
    features: ['Săn cực quang', 'Tắm Blue Lagoon', 'Ngắm thác nước Seljalandsfoss'],
    itinerary: [],
    feedback: []
  },
  {
    id: '17',
    name: 'Na Uy - Chinh Phục Vịnh Fjord',
    location: 'Bergen',
    country: 'Na Uy',
    description: 'Hành trình khám phá những vịnh biển sâu và dài nhất thế giới, bao quanh bởi những vách đá dựng đứng.',
    price: 78000000,
    duration: '7 Ngày 6 Đêm',
    rating: 4.8,
    category: 'Adventure',
    coordinates: { lat: 60.3913, lng: 5.3221 },
    images: [
      'https://images.unsplash.com/photo-1499363536502-87642509e31b?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1531366750370-531f9fb5f339?auto=format&fit=crop&q=80&w=1200'
    ],
    features: ['Du thuyền trên vịnh', 'Đi tàu hỏa Flåm', 'Lèo núi Pulpit Rock'],
    itinerary: [],
    feedback: []
  },
  {
    id: '18',
    name: 'Ai Cập - Bí Ẩn Kim Tự Tháp',
    location: 'Cairo',
    country: 'Ai Cập',
    description: 'Khám phá nền văn minh cổ đại bên dòng sông Nile và những công trình vĩ đại của các Pharaoh.',
    price: 42000000,
    duration: '5 Ngày 4 Đêm',
    rating: 4.7,
    category: 'Cultural',
    coordinates: { lat: 29.9792, lng: 31.1342 },
    images: [
      'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?auto=format&fit=crop&q=80&w=1200'
    ],
    features: ['Cưỡi lạc đà tại Giza', 'Du thuyền sông Nile', 'Thăm bảo tàng Ai Cập'],
    itinerary: [],
    feedback: []
  },
  {
    id: '19',
    name: 'Sydney - Biểu Tượng Châu Úc',
    location: 'Sydney',
    country: 'Australia',
    description: 'Thưởng thức nhạc kịch tại Opera House và đón nắng tại bãi biển Bondi nổi tiếng.',
    price: 38000000,
    duration: '6 Ngày 5 Đêm',
    rating: 4.6,
    category: 'City',
    coordinates: { lat: -33.8688, lng: 151.2093 },
    images: [
      'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1523428096881-5bd79d043006?auto=format&fit=crop&q=80&w=1200'
    ],
    features: ['Check-in Opera House', 'Lướt sóng Bondi', 'Cầu cảng Sydney'],
    itinerary: [],
    feedback: []
  },
  {
    id: '20',
    name: 'Tokyo - Nhịp Sống Tương Lai',
    location: 'Tokyo',
    country: 'Nhật Bản',
    description: 'Hòa mình vào đám đông tại Shibuya và trải nghiệm công nghệ hiện đại bậc nhất thế giới.',
    price: 32000000,
    duration: '5 Ngày 4 Đêm',
    rating: 4.8,
    category: 'City',
    coordinates: { lat: 35.6762, lng: 139.6503 },
    images: [
      'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&q=80&w=1200'
    ],
    features: ['Giao lộ Shibuya', 'Thăm đền Senso-ji', 'Ăn Sushi chợ Tsukiji'],
    itinerary: [],
    feedback: []
  },
  {
    id: '21',
    name: 'Hà Giang - Cung Đường Hạnh Phúc',
    location: 'Hà Giang',
    country: 'Việt Nam',
    description: 'Chinh phục Mã Pì Lèng - một trong tứ đại đỉnh đèo và ngắm hoa tam giác mạch rực rỡ.',
    price: 5500000,
    duration: '4 Ngày 3 Đêm',
    rating: 4.9,
    category: 'Adventure',
    coordinates: { lat: 22.8233, lng: 104.9833 },
    images: [
      'https://images.unsplash.com/photo-1505051508008-923feaf90180?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1581084364121-654eac18cba5?auto=format&fit=crop&q=80&w=1200'
    ],
    features: ['Chinh phục Mã Pì Lèng', 'Sông Nho Quế', 'Cột cờ Lũng Cú'],
    itinerary: [],
    feedback: []
  },
  {
    id: '22',
    name: 'Machu Picchu - Thành Phố Bị Lãng Quên',
    location: 'Cusco',
    country: 'Peru',
    description: 'Khám phá tàn tích hoàng tráng của đế chế Inca nằm chênh vênh trên dãy núi Andes hùng vĩ.',
    price: 95000000,
    duration: '8 Ngày 7 Đêm',
    rating: 5.0,
    category: 'Cultural',
    coordinates: { lat: -13.1631, lng: -72.5450 },
    images: [
      'https://images.unsplash.com/photo-1587595431973-160d0d94add1?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&q=80&w=1200'
    ],
    features: ['Leo núi Inca Trail', 'Thăm Thung lũng Linh thiêng', 'Thưởng thức ẩm thực Peru'],
    itinerary: [],
    feedback: []
  },
  {
    id: '23',
    name: 'Marrakech - Sắc Màu Ma-rốc',
    location: 'Marrakech',
    country: 'Morocco',
    description: 'Lạc lối trong những khu chợ gia vị thơm lừng và những cung điện lộng lẫy đầy hoa văn.',
    price: 48000000,
    duration: '6 Ngày 5 Đêm',
    rating: 4.7,
    category: 'Cultural',
    coordinates: { lat: 31.6295, lng: -7.9811 },
    images: [
      'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?auto=format&fit=crop&q=80&w=1200'
    ],
    features: ['Quảng trường Jemaa el-Fnaa', 'Vườn Majorelle', 'Cưỡi lạc đà sa mạc'],
    itinerary: [],
    feedback: []
  },
  {
    id: '24',
    name: 'Masai Mara - Tiếng Gọi Hoang Dã',
    location: 'Narok',
    country: 'Kenya',
    description: 'Chứng kiến cuộc di cư vĩ đại của động vật hoang dã và giao lưu cùng bộ lạc Masai.',
    price: 110000000,
    duration: '6 Ngày 5 Đêm',
    rating: 4.9,
    category: 'Nature',
    coordinates: { lat: -1.5271, lng: 35.1939 },
    images: [
      'https://images.unsplash.com/photo-1516422317953-2682972995af?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&q=80&w=1200'
    ],
    features: ['Săn ảnh Big Five', 'Bay khinh khí cầu', 'Giao lưu bộ lạc Masai'],
    itinerary: [],
    feedback: []
  },
  {
    id: '25',
    name: 'Rio - Cuồng Nhiệt Lễ Hội',
    location: 'Rio de Janeiro',
    country: 'Brazil',
    description: 'Tận hưởng sức nóng của vũ điệu Samba và check-in tại tượng Chúa Cứu Thế biểu tượng.',
    price: 82000000,
    duration: '7 Ngày 6 Đêm',
    rating: 4.6,
    category: 'City',
    coordinates: { lat: -22.9519, lng: -43.2105 },
    images: [
      'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1516306580123-e6e52b1b7b5f?auto=format&fit=crop&q=80&w=1200'
    ],
    features: ['Tượng Chúa Cứu Thế', 'Bãi biển Copacabana', 'Đi cáp treo Sugarloaf'],
    itinerary: [],
    feedback: []
  },
  {
    id: '26',
    name: 'New Zealand - Trung Địa Kỳ Ảo',
    location: 'Queenstown',
    country: 'New Zealand',
    description: 'Khám phá bối cảnh phim Chúa Tể Những Chiếc Nhẫn và tham gia các trò chơi mạo hiểm tại thủ đô phiêu lưu Queenstown.',
    price: 88000000,
    duration: '8 Ngày 7 Đêm',
    rating: 4.9,
    category: 'Adventure',
    coordinates: { lat: -45.0312, lng: 168.6626 },
    images: [
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&q=80&w=1200'
    ],
    features: ['Thăm làng Hobbiton', 'Nhảy Bungee', 'Du thuyền vịnh Milford Sound'],
    itinerary: [],
    feedback: []
  },
  {
    id: '27',
    name: 'Nam Phi - Mũi Hảo Vọng',
    location: 'Cape Town',
    country: 'South Africa',
    description: 'Chinh phục núi Bàn, gặp gỡ chim cánh cụt tại bãi biển Boulders và thưởng thức rượu vang hảo hạng.',
    price: 65000000,
    duration: '7 Ngày 6 Đêm',
    rating: 4.8,
    category: 'Nature',
    coordinates: { lat: -33.9249, lng: 18.4241 },
    images: [
      'https://images.unsplash.com/photo-1580137469216-9b137f43ec88?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1549117121-48359e2a243c?auto=format&fit=crop&q=80&w=1200'
    ],
    features: ['Leo núi Bàn', 'Ngắm chim cánh cụt', 'Thăm Mũi Hảo Vọng'],
    itinerary: [],
    feedback: []
  },
  {
    id: '28',
    name: 'Yên Bái - Mùa Vàng Mù Cang Chải',
    location: 'Mù Cang Chải',
    country: 'Việt Nam',
    description: 'Ngắm nhìn những thửa ruộng bậc thang đẹp nhất thế giới vào mùa lúa chín vàng óng ả.',
    price: 4500000,
    duration: '3 Ngày 2 Đêm',
    rating: 4.9,
    category: 'Nature',
    coordinates: { lat: 21.8592, lng: 104.1205 },
    images: [
      'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&q=80&w=1200'
    ],
    features: ['Đèo Khau Phạ', 'Ruộng bậc thang La Pán Tẩn', 'Bay khinh khí cầu'],
    itinerary: [],
    feedback: []
  },
  {
    id: '29',
    name: 'Hàn Quốc - Mùa Thu Vàng Nami',
    location: 'Đảo Nami',
    country: 'Hàn Quốc',
    description: 'Lãng mạn cùng những hàng cây ngân hạnh rực rỡ và không khí se lạnh quyến rũ của mùa thu xứ Hàn.',
    price: 18000000,
    duration: '5 Ngày 4 Đêm',
    rating: 4.8,
    category: 'Cultural',
    coordinates: { lat: 37.7915, lng: 127.5256 },
    images: [
      'https://images.unsplash.com/photo-1517154421773-0529f29ea451?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1493246507139-91e8bef99c02?auto=format&fit=crop&q=80&w=1200'
    ],
    features: ['Dạo bước đảo Nami', 'Thanh xuân tại Seoul', 'Trải nghiệm làm Kimchi'],
    itinerary: [],
    feedback: []
  },
  {
    id: '30',
    name: 'Thụy Sĩ - Điểm Hẹn Thượng Giới',
    location: 'Lucerne',
    country: 'Switzerland',
    description: 'Thị trấn trung cổ bên hồ Lucerne thơ mộng và những đỉnh núi tuyết phủ quanh năm.',
    price: 72000000,
    duration: '6 Ngày 5 Đêm',
    rating: 4.9,
    category: 'City',
    coordinates: { lat: 47.0502, lng: 8.3093 },
    images: [
      'https://images.unsplash.com/photo-1527668752968-14dc70a27c95?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&q=80&w=1200'
    ],
    features: ['Cầu gỗ Chapel', 'Núi Pilatus', 'Socola Thụy Sĩ'],
    itinerary: [],
    feedback: []
  },
  {
    id: '31',
    name: 'Alaska - Vùng Đất Hoang Dã',
    location: 'Anchorage',
    country: 'USA',
    description: 'Chứng kiến những tảng băng trôi khổng lồ và thế giới động vật hoang dã hùng vĩ vùng cực bắc.',
    price: 130000000,
    duration: '9 Ngày 8 Đêm',
    rating: 4.7,
    category: 'Adventure',
    coordinates: { lat: 61.2181, lng: -149.9003 },
    images: [
      'https://images.unsplash.com/photo-1520635665115-35439ca3a0bd?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1531366750370-531f9fb5f339?auto=format&fit=crop&q=80&w=1200'
    ],
    features: ['Ngắm cá voi', 'Quần thể sông băng', 'Công viên Denali'],
    itinerary: [],
    feedback: []
  },
  {
    id: '32',
    name: 'Jordan - Kho Báu Petra',
    location: 'Petra',
    country: 'Jordan',
    description: 'Thăm thành phố cổ đại được đục đẽo vào vách đá hồng và trải nghiệm nổi trên Biển Chết.',
    price: 52000000,
    duration: '6 Ngày 5 Đêm',
    rating: 4.9,
    category: 'Cultural',
    coordinates: { lat: 30.3285, lng: 35.4444 },
    images: [
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1526315282544-239bb7958643?auto=format&fit=crop&q=80&w=1200'
    ],
    features: ['Check-in Treasury', 'Tắm Biển Chết', 'Ngủ lều sa mạc Wadi Rum'],
    itinerary: [],
    feedback: []
  },
  {
    id: '33',
    name: 'Đà Nẵng - Thành Phố Của Những Cây Cầu',
    location: 'Đà Nẵng',
    country: 'Việt Nam',
    description: 'Thư giãn tại bãi biển Mỹ Khê và chiêm ngưỡng Bà Nà Hills - con đường lên tiên cảnh.',
    price: 5900000,
    duration: '4 Ngày 3 Đêm',
    rating: 4.8,
    category: 'Beach',
    coordinates: { lat: 16.0544, lng: 108.2022 },
    images: [
      'https://images.unsplash.com/photo-1559592481-74488ea56143?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1598910079075-80f2d87e09dd?auto=format&fit=crop&q=80&w=1200'
    ],
    features: ['Cầu Vàng Bà Nà Hills', 'Biển Mỹ Khê', 'Phố cổ Hội An'],
    itinerary: [],
    feedback: []
  },
  {
    id: '34',
    name: 'Singapore - Đảo Quốc Sư Tử',
    location: 'Singapore',
    country: 'Singapore',
    description: 'Trải nghiệm du lịch xanh và công nghệ hiện đại tại Gardens by the Bay.',
    price: 12000000,
    duration: '4 Ngày 3 Đêm',
    rating: 4.7,
    category: 'City',
    coordinates: { lat: 1.3521, lng: 103.8198 },
    images: [
      'https://images.unsplash.com/photo-1525596662741-e94ff99163e7?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1506704906740-c440f1804e1d?auto=format&fit=crop&q=80&w=1200'
    ],
    features: ['Gardens by the Bay', 'Marina Bay Sands', 'Đảo Sentosa'],
    itinerary: [],
    feedback: []
  },
  {
    id: '35',
    name: 'Bali - Thiên Đường Nghỉ Dưỡng',
    location: 'Ubud',
    country: 'Indonesia',
    description: 'Tận hưởng sự yên bình giữa những rừng dừa, ruộng bậc thang và những ngôi đền linh thiêng.',
    price: 15500000,
    duration: '5 Ngày 4 Đêm',
    rating: 4.9,
    category: 'Beach',
    coordinates: { lat: -8.5069, lng: 115.2625 },
    images: [
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1559628233-e02027d1433f?auto=format&fit=crop&q=80&w=1200'
    ],
    features: ['Xích đu Bali Swing', 'Đền Tanah Lot', 'Rừng khỉ Ubud'],
    itinerary: [],
    feedback: []
  }
];
