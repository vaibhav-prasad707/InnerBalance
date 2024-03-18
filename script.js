document.addEventListener('DOMContentLoaded', function() {
    const journalForm = document.getElementById('journalForm');
    const entryInput = document.getElementById('entryInput');
    const entriesContainer = document.getElementById('entriesContainer');
  
    journalForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const entryText = entryInput.value.trim();
      if (entryText !== '') {
        const entry = document.createElement('div');
        entry.classList.add('entry');
        entry.textContent = entryText;
        entriesContainer.prepend(entry);
        entryInput.value = '';
      }
    });
  });
  