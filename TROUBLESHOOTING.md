# Troubleshooting: Infobip Environment Variables Not Loading

## Quick Fix Checklist

1. **Verify .env file location**
   - The `.env` file MUST be in the project root (same directory as `package.json`)
   - Path should be: `C:\Users\Damir\Desktop\bash-inspired-portfolio\.env`

2. **Check .env file format**
   - No spaces around the `=` sign
   - No quotes around values (unless the value itself contains spaces)
   - Each variable on its own line
   - No trailing spaces

3. **Correct .env format:**
   ```env
   VITE_INFOBIP_API_KEY=e0529c7664809773d9bf1531ec89f7d5-87a1bebe-9fa8-4469-afab-60e82f09281b
   VITE_INFOBIP_BASE_URL=https://5585mj.api.infobip.com
   VITE_INFOBIP_APPLICATION_ID=EFCEC9D41024991167728934124A4788
   VITE_INFOBIP_MESSAGE_ID=ED1304C090BA1C7CBED317B6159A1A71
   ```

4. **Hard restart the dev server**
   - Stop the server completely (Ctrl+C)
   - Close the terminal/command prompt
   - Open a new terminal
   - Navigate to project: `cd C:\Users\Damir\Desktop\bash-inspired-portfolio`
   - Start server: `npm run dev`

5. **Verify in browser console**
   - Open browser DevTools (F12)
   - Go to Console tab
   - Type: `console.log(import.meta.env)`
   - Look for `VITE_INFOBIP_*` variables

## Common Issues

### Issue 1: Variables not prefixed with VITE_
**Solution:** All environment variables in Vite MUST start with `VITE_`

❌ Wrong:
```
INFOBIP_API_KEY=...
```

✅ Correct:
```
VITE_INFOBIP_API_KEY=...
```

### Issue 2: Spaces around equals sign
**Solution:** Remove all spaces

❌ Wrong:
```
VITE_INFOBIP_API_KEY = e0529c...
```

✅ Correct:
```
VITE_INFOBIP_API_KEY=e0529c...
```

### Issue 3: Quotes around values
**Solution:** Remove quotes (unless value has spaces)

❌ Wrong:
```
VITE_INFOBIP_API_KEY="e0529c..."
```

✅ Correct:
```
VITE_INFOBIP_API_KEY=e0529c...
```

### Issue 4: File encoding
**Solution:** Save as UTF-8 without BOM

### Issue 5: Cached environment
**Solution:** 
- Clear browser cache
- Hard refresh (Ctrl+Shift+R)
- Restart dev server

## Debug Steps

1. **Check if .env file exists:**
   ```powershell
   Test-Path .env
   ```

2. **View .env file contents:**
   ```powershell
   Get-Content .env
   ```

3. **Check for hidden characters:**
   - Open .env in a text editor
   - Enable "Show Whitespace" or "Show All Characters"
   - Remove any invisible characters

4. **Verify variable names match exactly:**
   - `VITE_INFOBIP_API_KEY` (not `VITE_INFOBIP_APIKEY`)
   - `VITE_INFOBIP_BASE_URL` (not `VITE_INFOBIP_BASEURL`)
   - `VITE_INFOBIP_APPLICATION_ID` (not `VITE_INFOBIP_APP_ID`)
   - `VITE_INFOBIP_MESSAGE_ID` (not `VITE_INFOBIP_MSG_ID`)

## Test Environment Variables

Add this to your browser console to test:

```javascript
console.log('API Key:', import.meta.env.VITE_INFOBIP_API_KEY);
console.log('Base URL:', import.meta.env.VITE_INFOBIP_BASE_URL);
console.log('Application ID:', import.meta.env.VITE_INFOBIP_APPLICATION_ID);
console.log('Message ID:', import.meta.env.VITE_INFOBIP_MESSAGE_ID);
```

If any show `undefined`, that variable isn't loading.

## Still Not Working?

1. **Create a fresh .env file:**
   - Delete the existing `.env` file
   - Create a new one with the exact content below
   - Save and restart server

2. **Check for .env.local or .env.development:**
   - These files override `.env`
   - Make sure they don't have conflicting values

3. **Verify Vite is reading the file:**
   - Check terminal output when starting `npm run dev`
   - Look for any warnings about environment variables

