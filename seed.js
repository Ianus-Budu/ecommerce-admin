const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Creez un store de test
  const store = await prisma.store.create({
    data: {
      id: 'test-store-id',
      name: 'Test Store',
      userId: 'temp-user-id'
    }
  });

  console.log('✅ Store created:', store.name);

  // Creez un billboard
  const billboard = await prisma.billboard.create({
    data: {
      label: 'Featured Products',
      imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800',
      storeId: store.id
    }
  });

  console.log('✅ Billboard created:', billboard.label);

  // Creez categorii
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: 'Electronics',
        billboardId: billboard.id,
        storeId: store.id
      }
    }),
    prisma.category.create({
      data: {
        name: 'Clothing',
        billboardId: billboard.id,
        storeId: store.id
      }
    }),
    prisma.category.create({
      data: {
        name: 'Books',
        billboardId: billboard.id,
        storeId: store.id
      }
    })
  ]);

  console.log('✅ Categories created:', categories.map(c => c.name).join(', '));

  // Creez sizes
  const sizes = await Promise.all([
    prisma.size.create({
      data: {
        name: 'Small',
        value: 'S',
        storeId: store.id
      }
    }),
    prisma.size.create({
      data: {
        name: 'Medium',
        value: 'M',
        storeId: store.id
      }
    }),
    prisma.size.create({
      data: {
        name: 'Large',
        value: 'L',
        storeId: store.id
      }
    })
  ]);

  console.log('✅ Sizes created:', sizes.map(s => s.name).join(', '));

  // Creez colors
  const colors = await Promise.all([
    prisma.color.create({
      data: {
        name: 'Red',
        value: '#FF0000',
        storeId: store.id
      }
    }),
    prisma.color.create({
      data: {
        name: 'Blue',
        value: '#0000FF',
        storeId: store.id
      }
    }),
    prisma.color.create({
      data: {
        name: 'Black',
        value: '#000000',
        storeId: store.id
      }
    })
  ]);

  console.log('✅ Colors created:', colors.map(c => c.name).join(', '));

  // Creez produse
  const products = await Promise.all([
    prisma.product.create({
      data: {
        name: 'Smartphone Pro',
        price: 999.99,
        categoryId: categories[0].id, // Electronics
        colorId: colors[2].id, // Black
        sizeId: sizes[1].id, // Medium
        storeId: store.id,
        isFeatured: true,
        isArchived: false,
        images: {
          create: [
            {
              url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800'
            }
          ]
        }
      }
    }),
    prisma.product.create({
      data: {
        name: 'Cotton T-Shirt',
        price: 29.99,
        categoryId: categories[1].id, // Clothing
        colorId: colors[0].id, // Red
        sizeId: sizes[1].id, // Medium
        storeId: store.id,
        isFeatured: true,
        isArchived: false,
        images: {
          create: [
            {
              url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800'
            }
          ]
        }
      }
    }),
    prisma.product.create({
      data: {
        name: 'Programming Book',
        price: 49.99,
        categoryId: categories[2].id, // Books
        colorId: colors[1].id, // Blue
        sizeId: sizes[0].id, // Small
        storeId: store.id,
        isFeatured: false,
        isArchived: false,
        images: {
          create: [
            {
              url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800'
            }
          ]
        }
      }
    })
  ]);

  console.log('✅ Products created:', products.map(p => p.name).join(', '));

  console.log('🎉 Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

