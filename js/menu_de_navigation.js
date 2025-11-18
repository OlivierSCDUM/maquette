/*	----------floating libchat-----------*/
(function() {
var chat = document.createElement('script');
chat.type = 'text/javascript';
chat.async = 'true';
chat.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'ubib.libanswers.com/load_chat.php?hash=f510ead3b82121573988017daae7c49f';
var s = document.getElementsByTagName('script')[0];
s.parentNode.insertBefore(chat, s);
})();
	/*---------------libchat code ends here---------------*/

/*---------------Test du menu header commence ici---------------*/
        document.addEventListener('click', function(event) {
            
            // --- Éléments du DOM ---
            const burgerButton = document.getElementById('burger-menu-trigger');
            const mainNav = document.getElementById('main-nav');
            const allPanels = document.querySelectorAll('.mega-menu-content');

            // Si les éléments de base n'existent pas, on ne fait rien.
            if (!burgerButton || !mainNav) return;
            
            // --- NOUVELLES FONCTIONS (pour l'état actif) ---
            function clearAllActiveClasses() {
                // Retire la classe 'active' de tous les <li> du menu principal
                document.querySelectorAll('#main-nav > ul > li').forEach(li => {
                    li.classList.remove('menu-item-active');
                });
            }

            // --- Fonction utilitaire (mise à jour) ---
            function resetAllMenus() {
                // Ferme le menu burger
                mainNav.classList.remove('nav-open');
                
                // Ferme tous les panneaux de méga menu
                allPanels.forEach(panel => {
                    panel.classList.remove('menu-panel-open');
                });
                
                // Efface aussi l'état actif (souligné)
                clearAllActiveClasses();
            }

            // Détermine si on est en vue mobile en testant la LARGEUR DE LA FENÊTRE
            const isMobile = window.innerWidth < 901;

            // === CAS 1 : Clic sur le BOUTON BURGER ===
            if (burgerButton.contains(event.target)) {
                event.stopPropagation();
                
                // Si on clique sur le burger, on inverse son état
                const isNavOpen = mainNav.classList.toggle('nav-open');
                
                // Si on l'ouvre, on s'assure que les méga menus sont fermés
                if (isNavOpen) {
                    allPanels.forEach(panel => {
                        panel.classList.remove('menu-panel-open');
                    });
                }
                
                // Si on ferme le burger, on efface l'état actif
                if (!isNavOpen) {
                    clearAllActiveClasses();
                }
                return;
            }

            // === CAS 2 : Clic sur un item du menu (dans <nav>) ===
            if (mainNav.contains(event.target)) {
                
                // --- Clic sur un LIEN SIMPLE (ex: "Etudiants") ---
                const simpleLink = event.target.closest('a:not([data-target-panel])');
                if (simpleLink && mainNav.contains(simpleLink)) {
                    
                    // Logique "Active" (PC UNIQUEMENT)
                    if (!isMobile) {
                        clearAllActiveClasses();
                        simpleLink.closest('li').classList.add('menu-item-active');
                    }
                    
                    // En mobile, un clic sur un lien doit fermer le menu burger
                    if (isMobile) {
                        resetAllMenus(); // Ferme tout
                    }
                    // Pas de 'return', on laisse l'événement de clic se propager au lien
                    return;
                }

                // --- Clic sur un DÉCLENCHEUR DE MÉGA MENU (ex: "Vos BU") ---
                const menuTrigger = event.target.closest('button.mega-menu-trigger');
                if (menuTrigger) {
                    event.stopPropagation();
                    const targetPanelId = menuTrigger.dataset.targetPanel;
                    const targetPanel = document.getElementById(targetPanelId);
                    const parentLi = menuTrigger.closest('li'); // Le <li> parent

                    if (!targetPanel) return;

                    // Vérifie si le panneau qu'on cible est déjà ouvert
                    const isAlreadyOpen = targetPanel.classList.contains('menu-panel-open');

                    // --- Logique "Active" (PC UNIQUEMENT) ---
                    if (!isMobile) {
                        if (isAlreadyOpen) {
                            // Si on clique sur le trigger du menu déjà ouvert pour le fermer
                            clearAllActiveClasses(); // On retire le soulignement
                        } else {
                            // Si on ouvre ce menu (ou un autre)
                            clearAllActiveClasses(); // On retire tout
                            parentLi.classList.add('menu-item-active'); // On active celui-ci
                        }
                    }

                    // --- Logique d'ouverture/fermeture (inchangée) ---
                    // D'abord, ferme tous les *autres* panneaux
                    allPanels.forEach(panel => {
                        if (panel !== targetPanel) {
                            panel.classList.remove('menu-panel-open');
                        }
                    });

                    // Ouvre/Ferme le panneau cible
                    targetPanel.classList.toggle('menu-panel-open');
                    
                    // En mobile, on NE ferme PAS le menu burger, on le laisse ouvert
                    return;
                }
            }

            // === CAS 3 : Clic À L'EXTÉRIEUR de tous les menus ===
            // (Si on clique sur le <body>, <main>, etc.)
            
            // MODIFIÉ: Cible l'ID unique
            if (!event.target.closest('#custom-main-header') && !event.target.closest('nav#main-nav')) {
                resetAllMenus(); // Ferme tout et retire le soulignement
            }
        });
/*---------------Test du menu header termine ici---------------*/

