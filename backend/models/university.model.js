const mongoose = require('mongoose');

const University = mongoose.model('University',mongoose.Schema({
    title: String,
    web_address: String,
    email: String,
    phone: String,
    Type: String,
    id: Number,
    Province: String,
    Foundation: String,
    Region: String,
    edu_point: Number,
    dorm_point: Number,
    trans_point: Number,
    campus_point: Number,
    unileague_point: Number,
    rate_count: Number,
    on_lisans_toplam:Number,
    lisans_toplam:Number,
    yüksek_lisans_toplam:Number,
    doktora_toplam:Number,
    ogrenci_toplam:Number,
    prof_toplam:Number,
    docent_toplam:Number,
    doktor_ogretim_uyesi_toplam:Number,
    ogretım_gorevlisi_toplam:Number,
    arastırma_gorevlisi_toplam:Number,
    toplam_akademisyen:Number,
}),'universities');

module.exports = University;