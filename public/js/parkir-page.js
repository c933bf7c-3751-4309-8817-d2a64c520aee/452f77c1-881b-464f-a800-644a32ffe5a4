document.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch('/api/slots');
        const slots = await response.json();

        const parkingSlotsContainer = document.getElementById('parking-slots');
        parkingSlotsContainer.innerHTML = '';  // Clear initial placeholders

        let occupiedCount = 0;
        let availableCount = 0;

        slots.forEach(slot => {
            const slotDiv = document.createElement('div');
            slotDiv.className = 'box';
            slotDiv.id = `slot_${slot.id}`;
            slotDiv.textContent = `slot_${slot.slot_number}`;

            if (slot.is_occupied) {
                slotDiv.classList.add('red');
                occupiedCount++;
            } else {
                availableCount++;
            }

            parkingSlotsContainer.appendChild(slotDiv);

            slotDiv.addEventListener('click', async () => {
                const isOccupied = slotDiv.classList.toggle('red');
                const newOccupiedStatus = isOccupied ? 1 : 0;

                // Update the database
                try {
                    await fetch(`/api/slots/${slot.id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ is_occupied: newOccupiedStatus })
                    });

                    // Update counts
                    if (isOccupied) {
                        occupiedCount++;
                        availableCount--;
                    } else {
                        occupiedCount--;
                        availableCount++;
                    }

                    updateStatus();
                } catch (error) {
                    console.error('Error updating slot status:', error);
                    // Revert the class change if the update fails
                    slotDiv.classList.toggle('red');
                }
            });
        });

        function updateStatus() {
            document.getElementById('redRemaining').textContent = `Parkir Terpakai: ${occupiedCount}`;
            document.getElementById('greenRemaining').textContent = `Parkir Tersedia: ${availableCount}`;
        }

        updateStatus();

    } catch (error) {
        console.error('Error fetching parking slots:', error);
    }
});
