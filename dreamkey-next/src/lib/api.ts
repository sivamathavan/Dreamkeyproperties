import { supabase } from './supabase';

export interface Property {
  id: string;
  title: string;
  type: string;
  status: string;
  price: number;
  area: number;
  bedrooms: number;
  bathrooms: number;
  location: string;
  description: string;
  amenities: string[];
  images: string[];
  video?: string;
  featured: boolean;
  slug: string;
}

const initialProperties: Property[] = [
  {
    id: "1",
    title: "The Azure Infinity Villa",
    type: "House",
    status: "Available",
    price: 4250000,
    area: 5800,
    bedrooms: 6,
    bathrooms: 5,
    location: "Malibu Heights, CA",
    description: "Experience unparalleled luxury in this masterfully designed villa. Featuring an infinity pool that blends into the Pacific horizon, a private home cinema, and a chef-grade kitchen with marble finishes.",
    amenities: ["Infinity Pool", "Home Cinema", "Smart Home"],
    images: ["https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80"],
    featured: true,
    slug: "azure-infinity-villa"
  }
];

export async function fetchProperties(): Promise<Property[]> {
  try {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Supabase fetch failed (fallback data used):', error.message || error);
      return initialProperties;
    }

    return data && data.length > 0 ? data : initialProperties;
  } catch (err: any) {
    console.warn('Network error (fallback data used):', err.message || err);
    return initialProperties;
  }
}

export async function getPropertyBySlug(slug: string): Promise<Property | null> {
  try {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .eq('slug', slug)
      .single();

    if (data) return data;
  } catch (err: any) {
    console.warn('Network error (fallback data used):', err.message || err);
  }

  const all = await fetchProperties();
  return all.find(p => p.slug === slug) || null;
}

export async function syncProperty(property: Property) {
  try {
    const { data, error } = await supabase
      .from('properties')
      .upsert(property);

    if (error) throw error;
  } catch (err: any) {
    console.warn('Demo Mode: Suppressed syncProperty error.', err);
  }
}

export async function removeProperty(id: string) {
  try {
    let { error } = await supabase
      .from('properties')
      .delete()
      .eq('id', id);

    if (error && !isNaN(Number(id))) {
      const { error: retryError } = await supabase
        .from('properties')
        .delete()
        .eq('id', parseInt(id));
      if (retryError) throw retryError;
    } else if (error) {
      throw error;
    }
  } catch (err: any) {
    console.warn('Demo Mode: Suppressed removeProperty error.', err);
  }
}

export async function uploadToSupabase(file: File, bucket = 'media') {
  try {
    const fileName = `${Date.now()}_${file.name}`;
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fileName, file);

    if (error) throw error;

    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(fileName);

    return publicUrl;
  } catch (err: any) {
    console.warn('Demo Mode: Mocked image upload.', err);
    // Create a local object URL so the image still renders temporarily in the dashboard!
    return URL.createObjectURL(file);
  }
}

export async function adminSignIn(email: string, password: string) {
  // Mock login for demo/portfolio purposes
  if (email === 'admin@dreamkey.com' && password === 'admin123') {
    if (typeof window !== 'undefined') {
      localStorage.setItem('mock_admin_session', 'true');
    }
    return { data: { user: { email: 'admin@dreamkey.com' } }, error: null } as any;
  }

  try {
    return await supabase.auth.signInWithPassword({ email, password });
  } catch (err: any) {
    console.warn('Auth network error:', err);
    return { data: null, error: { message: 'Network Error: Supabase is offline. Try demo credentials: admin@dreamkey.com / admin123' } } as any;
  }
}

export async function adminSignOut() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('mock_admin_session');
  }
  try {
    await supabase.auth.signOut();
  } catch (err) {
    console.warn('Sign out error:', err);
  }
}

export async function getAdminUser() {
  if (typeof window !== 'undefined' && localStorage.getItem('mock_admin_session')) {
    return { email: 'admin@dreamkey.com' } as any;
  }
  try {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  } catch (err) {
    console.warn('Get user error:', err);
    return null;
  }
}
