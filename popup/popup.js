document.addEventListener("DOMContentLoaded", async () => {
    // Exibir os trackers bloqueados
    browser.runtime.sendMessage({ action: "getBlockedTrackers" }).then((response) => {
      const count = response.count;
      const trackerList = response.blockedTrackers;
  
      document.getElementById("blocked-count").textContent = count;
  
      const trackerListElement = document.getElementById("blocked-trackers");
      trackerListElement.innerHTML = "";
  
      trackerList.forEach((url) => {
        const li = document.createElement("li");
        li.textContent = url;
        trackerListElement.appendChild(li);
      });
    });
  
    // Gerenciar listas de rastreadores
    const updateLists = async () => {
      const { lists = [] } = await browser.storage.local.get("lists");
      const listContainer = document.getElementById("tracking-lists");
      listContainer.innerHTML = "";
  
      lists.forEach((list, index) => {
        const li = document.createElement("li");
  
        // Checkbox para ativar/desativar listas
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = list.active !== false;
        checkbox.addEventListener("change", async () => {
          lists[index].active = checkbox.checked;
          await browser.storage.local.set({ lists });
          updateLists();
        });
  
        // Nome ou URL da lista
        const label = document.createElement("span");
        label.textContent = list.name || list.url;
  
        // Botão para remover listas personalizadas
        if (list.name !== "EasyList") { // EasyList não pode ser removida
          const removeButton = document.createElement("button");
          removeButton.textContent = "Remove";
          removeButton.addEventListener("click", async () => {
            lists.splice(index, 1);
            await browser.storage.local.set({ lists });
            updateLists();
          });
          li.appendChild(removeButton);
        }
  
        li.appendChild(checkbox);
        li.appendChild(label);
        listContainer.appendChild(li);
      });
    };
  
    // Adicionar uma nova lista personalizada
    document.getElementById("add-list").addEventListener("click", async () => {
      const input = document.getElementById("new-list-url");
      const url = input.value.trim();
  
      if (url) {
        try {
          const response = await fetch(url);
          const text = await response.text();
          const domains = text
            .split("\n")
            .map(line => line.replace("||", "").replace("^", "").split("^")[0])
            .filter(line => line.endsWith(".com") || line.endsWith(".net"));
  
          const { lists = [] } = await browser.storage.local.get("lists");
          lists.push({ name: url, url, domains, active: true });
          await browser.storage.local.set({ lists });
          input.value = "";
          updateLists();
        } catch (error) {
          console.error("Failed to fetch the list:", error);
        }
      }
    });
  
    updateLists();
  });
  