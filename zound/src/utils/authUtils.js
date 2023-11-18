// AuthUtils.js
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function isTokenExpired() {
    try {
        const accessToken = await AsyncStorage.getItem('accessToken');
        const refreshToken = await AsyncStorage.getItem('refreshToken');
        const dateTokenCreated = await AsyncStorage.getItem('dateTokenCreated');
        const currentUtcTime = new Date().toISOString();
        const expirationTime = new Date(dateTokenCreated);

        // Supposons que votre token expire après une heure (vous pouvez ajuster cela)
        expirationTime.setHours(expirationTime.getHours() + 1);

        return expirationTime < currentUtcTime;
    } catch (error) {
        // Gérer les erreurs liées à la récupération des valeurs AsyncStorage
        console.error("Erreur lors de la vérification de l'expiration du token :", error);
        return true; // Considérer le token comme expiré en cas d'erreur
    }
}
///Cette fonction utilise AsyncStorage pour récupérer les valeurs du token, de la date de création et du refresh token. Ensuite, elle compare la date de création avec l'heure actuelle et une hypothétique durée de validité du token (1 heure dans l'exemple, mais vous pouvez ajuster cela en fonction de la politique d'expiration de votre token). La fonction renvoie true si le token est expiré ou s'il y a une erreur lors de la récupération des valeurs AsyncStorage.
// Autres fonctions liées à l'authentification