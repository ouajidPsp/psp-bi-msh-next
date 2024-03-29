import prisma from "../../prisma/client";

export default async function get_blogs() {
  return await prisma.blog.findMany({
    select: {
      status: true,
      notes: true,
      id: true,
      title: true,
      content: true,
      publishedAt: true,
      author: {
        include: {
          avatar: true,
        },
      },
      image: true,
      categories: {
        include: {
          category: true,
        },
      },
    },
  });
}
