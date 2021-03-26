export class user {
    name: string
    id: string
    playlists: string[]
    privs: number /* 0 is admin; 1000 is normal user; 2000 is guest */

    constructor() {
        this.name = ""
        this.id = "AAAAAAAAAAAA"
        this.playlists = []
        this.privs = 2000 /* 2000 is guest */
    }
}