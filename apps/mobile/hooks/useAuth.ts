import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase'; // Adjust path if necessary
import { User, Session } from '@supabase/supabase-js'; // Import Session type

interface UserProfile {
  id: string;
  email: string;
  full_name: string | null;
  unit_system: string | null; // Make nullable as it's set during onboarding
  goal_type: string | null;     // Make nullable as it's set during onboarding
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSessionAndProfile = async () => {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();

      if (sessionError) {
        console.error('Error getting session:', sessionError);
        setUser(null);
        setProfile(null);
        setLoading(false);
        return;
      }

      if (session?.user) {
        setUser(session.user);
        
        // Fetch user profile from public.users table
        const { data: profileData, error: profileError } = await supabase
          .from('users')
          .select('id, email, full_name, unit_system, goal_type')
          .eq('id', session.user.id)
          .single();

        if (profileError) {
          console.error('Error fetching user profile:', profileError);
          setProfile(null);
        } else {
          setProfile(profileData as UserProfile); // Cast to UserProfile
        }
      } else {
        setUser(null);
        setProfile(null);
      }
      setLoading(false);
    };

    getSessionAndProfile();

    // Listen for changes on auth state
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event: string, session: Session | null) => { // Anotate types
        getSessionAndProfile(); // Re-fetch session and profile on auth state change
    });

    return () => subscription.unsubscribe();
  }, []);

  // Helper to check if onboarding is complete
  const isOnboardingComplete = profile ? profile.unit_system !== null && profile.goal_type !== null : false;

  return { user, profile, loading, isOnboardingComplete };
}