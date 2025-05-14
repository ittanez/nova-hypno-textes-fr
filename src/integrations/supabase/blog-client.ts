
// This is a placeholder file to fix build errors
// It provides a minimal mock of the blog client with no actual functionality

import { createClient } from '@supabase/supabase-js';

// Create a dummy client with no actual connection
export const blogClient = {
  from: () => ({
    select: () => ({
      order: () => ({
        data: null,
        error: null
      })
    }),
    insert: () => ({
      select: () => ({
        data: null, 
        error: null
      })
    }),
    update: () => ({
      eq: () => ({
        data: null,
        error: null
      })
    }),
    delete: () => ({
      eq: () => ({
        data: null,
        error: null
      })
    })
  }),
  storage: {
    from: () => ({
      upload: async () => ({ data: null, error: null }),
      getPublicUrl: () => ({ data: { publicUrl: '' } })
    })
  },
  rpc: () => ({ data: null, error: null })
};

export default blogClient;
