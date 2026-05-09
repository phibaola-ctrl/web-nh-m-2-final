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
  }
];
