import zlib
import struct
import math

def create_kunai_png(filepath, size=256):
    width = size
    height = size
    
    # Create raw RGBA buffer
    raw_data = bytearray()
    
    # Kunai geometry parameters (diagonal from top-right to bottom-left)
    # Ring center: (x=195, y=55)
    # Bolster: (x=120, y=130)
    # Blade tip: (x=30, y=220)
    # Blade left edge: (x=80, y=140)
    # Blade right edge: (x=110, y=170)
    
    scale = size / 256.0
    
    ring_cx = 195 * scale
    ring_cy = 60 * scale
    ring_r_out = 22 * scale
    ring_r_in = 11 * scale
    
    tip_x = 30 * scale
    tip_y = 225 * scale
    
    spine_start_x = 115 * scale
    spine_start_y = 140 * scale
    
    left_corner_x = 95 * scale
    left_corner_y = 120 * scale
    
    right_corner_x = 135 * scale
    right_corner_y = 160 * scale
    
    def point_in_triangle(px, py, x1, y1, x2, y2, x3, y3):
        area = 0.5 * (-y2 * x3 + y1 * (-x2 + x3) + x1 * (y2 - y3) + x2 * y3)
        s = 1 / (2 * area) * (y1 * x3 - x1 * y3 + (y3 - y1) * px + (x1 - x3) * py)
        t = 1 / (2 * area) * (x1 * y2 - y1 * x2 + (y1 - y2) * px + (x2 - x1) * py)
        return s >= 0 and t >= 0 and (1 - s - t) >= 0

    def dist_to_segment(px, py, x1, y1, x2, y2):
        dx = x2 - x1
        dy = y2 - y1
        if dx == 0 and dy == 0:
            return math.hypot(px - x1, py - y1)
        t = max(0, min(1, ((px - x1) * dx + (py - y1) * dy) / (dx * dx + dy * dy)))
        proj_x = x1 + t * dx
        proj_y = y1 + t * dy
        return math.hypot(px - proj_x, py - proj_y), t

    for y in range(height):
        raw_data.append(0)  # Filter type 0 (None)
        for x in range(width):
            r, g, b, a = 0, 0, 0, 0
            
            # 1. Ring Pommel
            d_ring = math.hypot(x - ring_cx, y - ring_cy)
            if ring_r_in - 1 <= d_ring <= ring_r_out + 1:
                # Radial highlight
                t_ring = (d_ring - ring_r_in) / (ring_r_out - ring_r_in)
                ang = math.atan2(y - ring_cy, x - ring_cx)
                spec = math.cos(ang - math.pi * 0.75) * 0.5 + 0.5
                val = int(70 + 150 * spec * (1 - abs(t_ring - 0.5) * 1.5))
                val = max(30, min(255, val))
                r, g, b = val, val + 2, val + 6
                # Soft antialiasing
                if d_ring > ring_r_out:
                    a = int(max(0, min(255, (ring_r_out + 1 - d_ring) * 255)))
                elif d_ring < ring_r_in:
                    a = int(max(0, min(255, (d_ring - (ring_r_in - 1)) * 255)))
                else:
                    a = 255
            
            # 2. Handle / Cord Wrap
            dist_handle, t_h = dist_to_segment(x, y, ring_cx - 15 * scale, ring_cy + 15 * scale, spine_start_x, spine_start_y)
            if dist_handle <= 7.5 * scale:
                # Handle cord wrap ribbed pattern
                rib = math.sin(t_h * 45) * 0.5 + 0.5
                h_val = int(80 + 90 * rib + 40 * (1 - dist_handle / (7.5 * scale)))
                r, g, b = h_val, h_val + 2, h_val + 4
                aa = max(0, min(255, int((7.5 * scale - dist_handle) * 255)))
                a = max(a, aa)

            # 3. Diamond Blade Facet Top (Light reflective side)
            if point_in_triangle(x, y, left_corner_x, left_corner_y, spine_start_x, spine_start_y, tip_x, tip_y):
                # Distance along blade
                d_tip = math.hypot(x - tip_x, y - tip_y) / (180 * scale)
                # Distance from spine
                d_sp, _ = dist_to_segment(x, y, spine_start_x, spine_start_y, tip_x, tip_y)
                light = 230 - int(d_sp * 12) + int(d_tip * 30)
                light = max(110, min(255, light))
                r, g, b, a = light, min(255, light + 4), min(255, light + 10), 255

            # 4. Diamond Blade Facet Bottom (Shadow side)
            elif point_in_triangle(x, y, right_corner_x, right_corner_y, spine_start_x, spine_start_y, tip_x, tip_y):
                d_sp, _ = dist_to_segment(x, y, spine_start_x, spine_start_y, tip_x, tip_y)
                dark = 50 + int(d_sp * 8)
                dark = max(35, min(95, dark))
                r, g, b, a = dark, dark + 1, dark + 3, 255

            # 5. Center Spine Glint Line
            dist_spine, t_sp = dist_to_segment(x, y, spine_start_x, spine_start_y, tip_x, tip_y)
            if dist_spine <= 1.2 * scale and t_sp > 0.05 and t_sp < 0.98:
                spine_val = int(240 * (1 - dist_spine / (1.2 * scale)))
                r = max(r, spine_val)
                g = max(g, spine_val)
                b = max(b, min(255, spine_val + 10))
                a = max(a, 255)

            # 6. Tip Glint Sparkle
            d_tip = math.hypot(x - tip_x, y - tip_y)
            if d_tip <= 3.5 * scale:
                glint = int(255 * (1 - d_tip / (3.5 * scale)))
                r = max(r, glint)
                g = max(g, glint)
                b = max(b, glint)
                a = max(a, glint)

            raw_data.extend([r, g, b, a])

    # Compress raw data with zlib
    compressed_data = zlib.compress(raw_data)
    
    # Construct PNG file
    png_signature = b'\x89PNG\r\n\x1a\n'
    
    # IHDR chunk
    ihdr_data = struct.pack('>IIBBBBB', width, height, 8, 6, 0, 0, 0)
    ihdr_crc = zlib.crc32(b'IHDR' + ihdr_data)
    ihdr_chunk = struct.pack('>I', len(ihdr_data)) + b'IHDR' + ihdr_data + struct.pack('>I', ihdr_crc)
    
    # IDAT chunk
    idat_crc = zlib.crc32(b'IDAT' + compressed_data)
    idat_chunk = struct.pack('>I', len(compressed_data)) + b'IDAT' + compressed_data + struct.pack('>I', idat_crc)
    
    # IEND chunk
    iend_crc = zlib.crc32(b'IEND')
    iend_chunk = struct.pack('>I', 0) + b'IEND' + struct.pack('>I', iend_crc)
    
    with open(filepath, 'wb') as f:
        f.write(png_signature + ihdr_chunk + idat_chunk + iend_chunk)
    print(f"Generated {filepath} successfully.")

if __name__ == '__main__':
    create_kunai_png('public/kunai.png', 384)
    create_kunai_png('public/Kunai.png', 384)
    create_kunai_png('src/assets/ninja-assets/kunai.png', 384)
    print("All PNG assets generated!")
