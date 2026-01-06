// Supabase Configuration
const SUPABASE_URL = 'https://qvomtnivigdqoejqbyqv.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF2b210bml2aWdkcW9lanFieXF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc1NDk0NDYsImV4cCI6MjA4MzEyNTQ0Nn0.bTPtIWBQtsKB9G0yLmif4fim9xjtAYViOFAJqdyBBeQ';

let supabaseClient;
if (typeof supabase !== 'undefined') {
    supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
}

// Initial fallback data
const initialProperties = [
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

// Global functions for data interaction
async function fetchProperties() {
    if (!supabaseClient) {
        return initialProperties;
    }

    const { data, error } = await supabaseClient
        .from('properties')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Fetch error:', error);
        // Fallback to localStorage if db fails
        const local = localStorage.getItem('dreamkey_properties');
        return local ? JSON.parse(local) : initialProperties;
    }

    return data && data.length > 0 ? data : initialProperties;
}

async function getPropertyBySlug(slug) {
    let result = null;

    if (supabaseClient) {
        const { data, error } = await supabaseClient
            .from('properties')
            .select('*')
            .eq('slug', slug)
            .single();
        if (data) result = data;
    }

    if (!result) {
        const all = await fetchProperties();
        result = all.find(p => p.slug === slug);
    }

    return result;
}

async function syncProperty(property) {
    if (!supabaseClient) {
        const all = await fetchProperties();
        const index = all.findIndex(p => p.id === property.id);
        if (index !== -1) all[index] = property;
        else all.push(property);
        localStorage.setItem('dreamkey_properties', JSON.stringify(all));
        return;
    }

    const { data, error } = await supabaseClient
        .from('properties')
        .upsert(property);

    if (error) throw error;
}

async function removeProperty(id) {
    if (!supabaseClient) {
        const all = await fetchProperties();
        const filtered = all.filter(p => p.id !== id);
        localStorage.setItem('dreamkey_properties', JSON.stringify(filtered));
        return;
    }

    // Try both string and number just in case the DB schema varies
    let { error } = await supabaseClient
        .from('properties')
        .delete()
        .eq('id', id);

    if (error && !isNaN(id)) {
        const { error: retryError } = await supabaseClient
            .from('properties')
            .delete()
            .eq('id', parseInt(id));
        if (retryError) throw retryError;
    } else if (error) {
        throw error;
    }
}

async function uploadToSupabase(file, bucket = 'media') {
    if (!supabaseClient) return null;

    const fileName = `${Date.now()}_${file.name}`;
    const { data, error } = await supabaseClient.storage
        .from(bucket)
        .upload(fileName, file);

    if (error) throw error;

    const { data: { publicUrl } } = supabaseClient.storage
        .from(bucket)
        .getPublicUrl(fileName);

    return publicUrl;
}

// --- Auth Helpers ---
async function adminSignIn(email, password) {
    if (!supabaseClient) return { error: 'Supabase not initialized' };
    return await supabaseClient.auth.signInWithPassword({ email, password });
}

async function adminSignOut() {
    if (!supabaseClient) return;
    await supabaseClient.auth.signOut();
    window.location.reload();
}

async function getAdminUser() {
    if (!supabaseClient) return null;
    const { data: { user } } = await supabaseClient.auth.getUser();
    return user;
}
