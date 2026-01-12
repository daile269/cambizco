export interface BlogPost {
  id: string;
  category: string;
  title: string;
  description1: string;
  description2: string;
  description3: string;
  description4: string;
  image1: string;
  image2: string;
  image3: string;
  image4: string;
  createdAt: number;
  updatedAt: number;
  slug: string;
  featured?: boolean; // Đánh dấu bài viết nổi bật
  // Optional fields for display
  excerpt?: string;
  date?: string;
}

export interface BlogPostInput {
  category: string;
  title: string;
  description1: string;
  description2: string;
  description3: string;
  description4: string;
  image1: string;
  image2: string;
  image3: string;
  image4: string;
  slug: string;
}
