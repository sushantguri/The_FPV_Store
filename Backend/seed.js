const pool = require('./dbConfig');

const products = [
    // --- ACCESSORIES ---
    {
        name: 'Anti-Static Tweezers Set',
        description: 'Precision tweezers for handling small SMD components and delicate FPV wiring.',
        price: 12.50,
        category: 'Accessories',
        imageUrl: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=400',
        stock: 50,
        rating: 4.5
    },
    {
        name: 'High-Tensile Battery Straps (4 Pack)',
        description: 'Rubberized Kevlar straps that wont snap or slide. Perfect for 5-inch freestyle quads.',
        price: 9.99,
        category: 'Accessories',
        imageUrl: 'https://images.unsplash.com/photo-1590235246717-083d80a1883f?q=80&w=400',
        stock: 200,
        rating: 4.8
    },

    // --- BATTERY & CHARGING ---
    {
        name: 'ISDT 608AC Smart Charger',
        description: '50W AC / 200W DC smart charger with modular power supply. Supports 1-6S LiPo.',
        price: 59.00,
        category: 'Battery & Charging',
        imageUrl: 'https://images.unsplash.com/photo-1619441162624-8178f24458f4?q=80&w=400',
        stock: 30,
        rating: 4.9
    },
    {
        name: 'GNB 1100mAh 6S 130C LiPo',
        description: 'Ultra high discharge racing battery. Lightweight and extremely punchy.',
        price: 32.99,
        category: 'Battery & Charging',
        imageUrl: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=400',
        stock: 100,
        rating: 4.7
    },

    // --- ELECTRONICS ---
    {
        name: 'SpeedyBee F405 V3 Stack',
        description: 'The best budget stack for FPV drones. Includes FC and 50A ESC. Bluetooth configuration supported.',
        price: 69.99,
        category: 'Electronics',
        imageUrl: 'https://oscarliang.com/ctt/uploads/2022/10/SpeedyBee-F405-V3-Stack-FC-ESC-1.jpg',
        stock: 50,
        rating: 4.8
    },
    {
        name: 'Rush Tank Solo VTX',
        description: 'High power analog video transmitter. Up to 1.6W output for extreme range.',
        price: 49.99,
        category: 'Electronics',
        imageUrl: 'https://cdn.shopify.com/s/files/1/0027/2708/4144/products/Rush-Tank-Solo-5-8GHz-VTX-1_1024x1024.jpg',
        stock: 45,
        rating: 4.9
    },
    {
        name: 'Foxeer Reaper Slim 60A ESC',
        description: 'Reliable and efficient 4-in-1 ESC. Supports DSHOT600 and high voltage spikes.',
        price: 74.50,
        category: 'Electronics',
        imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=400',
        stock: 25,
        rating: 4.6
    },

    // --- FPV EQUIPMENT ---
    {
        name: 'DJI O3 Air Unit',
        description: 'The ultimate digital FPV system. 4K/60fps recording and low latency transmission.',
        price: 229.00,
        category: 'FPV Equipment',
        imageUrl: 'https://dji-official-aps-southeast-1.aliyuncs.com/cms/uploads/000f274a004746279373972620703666.png',
        stock: 15,
        rating: 5.0
    },
    {
        name: 'Foxeer T-Rex Micro Camera',
        description: '1500TVL low latency FPV camera for clear analog video. Excellent low light performance.',
        price: 32.90,
        category: 'FPV Equipment',
        imageUrl: 'https://www.foxeer.com/images/goods/20201113/020c02c650892040058c65f956555139.jpg',
        stock: 25,
        rating: 4.6
    },
    {
        name: 'VAS SkyHammer Antenna',
        description: 'Long range omni-directional antenna for analog FPV goggles.',
        price: 24.95,
        category: 'FPV Equipment',
        imageUrl: 'https://images.unsplash.com/photo-1551703599-6b3e8379aa8b?q=80&w=400',
        stock: 60,
        rating: 4.9
    },

    // --- FRAMES ---
    {
        name: 'TBS Source One V5 Frame',
        description: 'The standard for open source freestyle frames. Durable carbon fiber and affordable price point.',
        price: 29.95,
        category: 'Frames',
        imageUrl: 'https://team-blacksheep.com/img/products/tbs_source_one_v5_1.jpg',
        stock: 30,
        rating: 4.7
    },
    {
        name: 'Nazgul5 V3 Freestyle Frame',
        description: 'Professional grade freestyle frame with independent arms and vibration damping.',
        price: 54.00,
        category: 'Frames',
        imageUrl: 'https://images.unsplash.com/photo-1527977966376-1c841de9d21a?q=80&w=400',
        stock: 40,
        rating: 4.8
    },

    // --- MOTORS ---
    {
        name: 'T-Motor Velox V3 2207',
        description: 'High performance motors for freestyle flying. 1750KV / 1950KV options available.',
        price: 18.99,
        category: 'Motors',
        imageUrl: 'https://pyrodrone.com/cdn/shop/products/T-Motor-Velox-V3-2207-1750KV-1950KV-Motor-1_1024x1024.jpg',
        stock: 100,
        rating: 4.9
    },
    {
        name: 'Xing2 2207 Unibell Motor',
        description: 'Durable unibell design with N52SH magnets. Extremely smooth performance.',
        price: 21.50,
        category: 'Motors',
        imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=400',
        stock: 80,
        rating: 4.7
    },

    // --- PROPELLERS ---
    {
        name: 'HQProp Ethix S5 Props',
        description: 'Cinematic props designed by Steele. Smooth flight characteristics.',
        price: 3.99,
        category: 'Propellers',
        imageUrl: 'https://cdn.shopify.com/s/files/1/0027/2708/4144/products/HQProp-Ethix-S5-Light-Grey-Props-1_1024x1024.jpg',
        stock: 500,
        rating: 4.8
    },
    {
        name: 'Gemfan Hurricane 51466',
        description: 'Durable freestyle propellers. Great grip and control.',
        price: 3.50,
        category: 'Propellers',
        imageUrl: 'https://cdn.shopify.com/s/files/1/0027/2708/4144/products/Gemfan-Hurricane-51466-V2-Durable-3-Blade-5-Prop-4-Pack-Midnight-Grey-1_1024x1024.jpg',
        stock: 300,
        rating: 4.8
    },

    // --- RADIO & RECEIVER ---
    {
        name: 'Radiomaster Boxer ELRS',
        description: 'Compact and powerful radio with built-in ELRS. Hall effect gimbals.',
        price: 139.99,
        category: 'Radio & Receiver',
        imageUrl: 'https://cdn.shopify.com/s/files/1/0027/2708/4144/products/Radiomaster-Boxer-Radio-ELRS-1_1024x1024.jpg',
        stock: 40,
        rating: 4.9
    },
    {
        name: 'BetaFPV ELRS Nano RX',
        description: 'Long range, low latency control link. 2.4GHz ExpressLRS protocol.',
        price: 15.99,
        category: 'Radio & Receiver',
        imageUrl: 'https://betafpv.com/cdn/shop/products/ELRSNanoReceiver_2.4G_1_1000x.jpg',
        stock: 200,
        rating: 4.9
    },
    // --- DJI DRONES ---
    {
        name: 'DJI Avata 2',
        description: 'Immersive FPV drone with 4K/60fps HDR camera, 155° super-wide FOV, and intuitive motion control.',
        price: 999.00,
        category: 'DJI Drones',
        imageUrl: 'https://dji-official-aps-southeast-1.aliyuncs.com/cms/uploads/2f16a0300a40492892333857e052341b.png',
        stock: 10,
        rating: 4.9
    },
    {
        name: 'DJI FPV Combo',
        description: 'Redefine flying with the DJI FPV Combo. Immersive flight, 4K/60fps, super-wide FOV, and low-latency HD transmission.',
        price: 899.00,
        category: 'DJI Drones',
        imageUrl: 'https://dji-official-aps-southeast-1.aliyuncs.com/cms/uploads/8c7a6b6f0a404928b2333857e052341b.png',
        stock: 5,
        rating: 4.8
    }
];

const tutorials = [
    {
        title: 'How to Solder Like a Pro',
        content: 'Soldering is the most important skill in FPV. In this guide, we cover the basics of soldering, including temperature control, flux usage, and tinning wires. Always keep your tip clean and use high-quality 60/40 leaded solder for the best results.',
        videoUrl: 'https://www.youtube.com/embed/J5Sb21qbpEQ',
        author: 'FPV Master'
    },
    {
        title: 'Betaflight Setup Guide 4.3',
        content: 'Learn how to configure Betaflight 4.3 for the best flight performance. We walk through the Ports tab, Configuration, Receiver, and Modes. Make sure to backup your diff all before making changes.',
        videoUrl: 'https://www.youtube.com/embed/Ltot-1o5F1E',
        author: 'Tech Drone'
    },
    {
        title: 'ExpressLRS Binding Guide',
        content: 'Binding your ELRS receiver can be tricky. This tutorial explains the binding phrase method and the traditional bind button method. We also cover how to update your firmware via WiFi.',
        videoUrl: 'https://www.youtube.com/embed/8q7_aV8eLUE',
        author: 'Oscar Liang'
    }

];

async function main() {
    console.log('Start seeding ...');

    console.log('Deleting existing data...');
    await pool.execute('SET FOREIGN_KEY_CHECKS = 0');
    await pool.execute('TRUNCATE TABLE order_items');
    await pool.execute('TRUNCATE TABLE orders');
    await pool.execute('TRUNCATE TABLE products');
    await pool.execute('TRUNCATE TABLE tutorials');
    await pool.execute('SET FOREIGN_KEY_CHECKS = 1');
    console.log('Deleted existing data.');

    for (const product of products) {
        const [result] = await pool.execute(
            'INSERT INTO products (name, description, price, category, image_url, stock, rating) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [product.name, product.description, product.price, product.category, product.imageUrl, product.stock, product.rating]
        );
        console.log(`Created product with id: ${result.insertId}`);
    }

    for (const tutorial of tutorials) {
        const [result] = await pool.execute(
            'INSERT INTO tutorials (title, content, video_url, author) VALUES (?, ?, ?, ?)',
            [tutorial.title, tutorial.content, tutorial.videoUrl, tutorial.author]
        );
        console.log(`Created tutorial with id: ${result.insertId}`);
    }

    console.log('Seeding finished.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await pool.end();
    });
