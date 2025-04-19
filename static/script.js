document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    form.addEventListener('submit', function (event) {
      event.preventDefault();
  
      const data = {
        name: document.getElementById('name').value,
        age: document.getElementById('age').value,
        mobile_number: document.getElementById('mobile_number').value,
        aadhar_number: document.getElementsByName('aadhar_number')[0].value,
        gender: document.querySelector('input[name="gender"]:checked')?.value || '',
        doctor: document.querySelector('input[name="doctor"]:checked')?.value || '',
        date_of_treatment: document.getElementById('DOT').value,
        slot: document.querySelector('input[name="slot"]:checked')?.value || '',
        feedback: document.getElementById('textarea').value
      };
  
      fetch('/generate_receipt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
        .then(response => {
          if (response.ok) return response.blob();
          throw new Error('Failed to generate PDF');
        })
        .then(blob => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'hospital_receipt.pdf';
          document.body.appendChild(a);
          a.click();
          a.remove();
        })
        .catch(error => console.error('Error:', error));
    });
  });
  