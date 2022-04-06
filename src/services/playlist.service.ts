import { PlaylistType } from "@/enums";
import type { PlaylistSource, Platform } from "@/typings/main"

export function getPlaylistSourceFromUrl(url: string): PlaylistSource | null {

    try {
            
        const parsed = new URL(url);
        
        if(parsed.hostname === 'open.spotify.com') 
            return getPlaylistSourceFromSpotifyUrl(parsed.pathname);
        else return null;

    } catch(e) {
        return null;
    }


}

function getPlaylistSourceFromSpotifyUrl(pathname: string): PlaylistSource | null {

    const id = pathname.split('/')[2];

    if(!id) return null;

    return {
        type: PlaylistType.Spotify, id
    };

}

export const platforms: { [type: string]: Platform } = {
    [PlaylistType.Spotify]: {
        label: 'Spotify',
        logo: '/assets/img/logos/spotify-full.png'
    }
}