<script lang="ts">
    import LayoutGrid, { Cell } from "@smui/layout-grid";
</script>

<LayoutGrid>
    <Cell spanDevices={{ desktop: 6, tablet: 4, phone: 4 }}>
        <span><strong>Platform:</strong> Spotify</span>
    </Cell>
    <Cell spanDevices={{ desktop: 6, tablet: 4, phone: 4 }}>
        <span><strong>Name:</strong> Top 50 Brasil</span>
    </Cell>
    <Cell spanDevices={{ desktop: 6, tablet: 4, phone: 4 }}>
        <span><strong>N° of playable songs:</strong> 48</span>
    </Cell>
    <Cell spanDevices={{ desktop: 6, tablet: 4, phone: 4 }} >
        <span><strong>N° of songs not played:</strong> 48</span>
    </Cell>
</LayoutGrid>
