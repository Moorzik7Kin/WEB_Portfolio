// Фігурні дужки, щоб змінні не заважали іншим файлам
{
  const saved = localStorage.getItem('theme');
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  let theme;
  if (saved) { theme = saved; } 
  else { theme = systemDark ? 'dark' : 'light';
    if (theme === 'dark') {localStorage.setItem('theme', 'dark');}
    else                  {localStorage.setItem('theme', 'light');} }

  document.documentElement.dataset.theme = theme;
}